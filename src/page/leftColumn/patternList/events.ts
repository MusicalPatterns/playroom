import { Data, Id, isId, Pattern, Spec } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { PerformerStateKey } from '../../../performer'
import { resetActions, SpecStateKey } from '../../../spec'
import { Action } from '../../../types'
import { maybePatternFromPatternsAndId } from '../../maybePatternFromPatternsAndId'
import { PageStateKey } from '../../types'
import { adjustWindowActionsWithSideEffects } from '../adjustWindowActions'
import { openRightColumn } from '../rightColumnActions'
import { HandlePatternChange, HandlePatternChangeParameters } from './types'

const handlePatternChange: HandlePatternChange =
    async ({ dispatch, event, patterns, id, rightColumnOpen }: HandlePatternChangeParameters): Promise<void> => {
        const target: EventTarget & Element = event.currentTarget
        let newId: Id
        if (isId(target.id)) {
            newId = target.id
        }
        else {
            throw new Error('target id was not a pattern Id')
        }

        if (newId === id) {
            return
        }

        const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id: newId })
        if (isUndefined(pattern)) {
            return
        }

        const data: Data = pattern.data
        const initialSpec: Spec = data.initial

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: SpecStateKey.INITIAL_SPEC, data: initialSpec },
                { type: PageStateKey.PATTERN_ID, data: newId },
                { type: SpecStateKey.ATTRIBUTES, data: data.attributes },
                { type: SpecStateKey.VALIDATION_FUNCTION, data: data.validationFunction },
                { type: SpecStateKey.PRESETS, data: data.presets },
                { type: PageStateKey.PAGE_NAME, data: undefined },
                { type: PerformerStateKey.PERFORMER_DISABLED, data: false },
            ])
            .concat(adjustWindowActionsWithSideEffects())

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        doAsync(async () => {
            await setTimePosition(BEGINNING)
        })

        openRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handlePatternChange,
}
