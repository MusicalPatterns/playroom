import { Id, isId, Pattern, Spec, SpecData } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { PerformerStateKey } from '../../performer'
import { Action } from '../../root'
import { resetActions, SpecStateKey } from '../../spec'
import { maybePatternFromPatternsAndId } from '../components'
import { PageStateKey } from '../state'
import { adjustWindowActionsWithSideEffects, openRightColumn } from './helpers'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternChangeEventParameters }: PatternChangeEventHandlerParameters): Promise<void> => {
        const { event, patterns, id, rightColumnOpen } = patternChangeEventParameters
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

        const specData: SpecData = pattern.specData
        const initialSpec: Spec = specData.initial

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: SpecStateKey.INITIAL_SPEC, data: initialSpec },
                { type: PageStateKey.PATTERN_ID, data: newId },
                { type: SpecStateKey.SPEC_ATTRIBUTES, data: specData.attributes },
                { type: SpecStateKey.VALIDATION_FUNCTION, data: specData.validationFunction },
                { type: SpecStateKey.PRESETS, data: specData.presets },
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
