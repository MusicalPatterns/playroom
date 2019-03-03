import { Id, Pattern, Spec, SpecData } from '@musical-patterns/pattern'
import { setTimePosition, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, doAsync, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { resetActions } from '../../spec'
import { adjustWindowActionsWithSideEffects, openRightPanel } from './helpers'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternChangeEventParameters }: PatternChangeEventHandlerParameters): Promise<void> => {
        const { event, patterns, id, rightPanelOpen } = patternChangeEventParameters
        const target: HTMLLIElement = event.currentTarget as HTMLLIElement
        const newId: Id = target.id as Id

        if (newId === id) {
            return
        }

        const pattern: Maybe<Pattern> = patterns && patterns[ newId ]
        if (!pattern) {
            return
        }

        togglePaused()

        const specData: SpecData = pattern.specData
        const initialSpec: Spec = specData.initial

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: ActionType.SET_INITIAL_SPEC, data: initialSpec },
                { type: ActionType.SET_PATTERN_ID, data: newId },
                { type: ActionType.SET_SPEC_ATTRIBUTES, data: specData.attributes },
                { type: ActionType.SET_VALIDATION_FUNCTION, data: specData.validationFunction },
                { type: ActionType.SET_PRESETS, data: specData.presets },
                { type: ActionType.SET_PAGE_NAME, data: undefined },
                { type: ActionType.SET_PERFORMER_DISABLED, data: false },
            ])
            .concat(adjustWindowActionsWithSideEffects())

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        togglePaused()

        doAsync(async () => {
            await setTimePosition(BEGINNING)
        })

        openRightPanel({ dispatch, rightPanelOpen })
    }

export {
    handlePatternChange,
}
