import { PatternSpec } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType, StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../state'
import { buildInitialDisabledButtons } from './buildInitialDisabledButtons'
import { stringifyPatternSpec } from './stringifyPatternSpec'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        const patternSpec: PatternSpec = patterns[ patternId ].spec

        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
        const initialDisabledButtons: StringifiedPatternSpecInputStates = buildInitialDisabledButtons(patternSpec)

        const actions: Action[] = [
            { type: ActionType.SET_PATTERN_ID, data: patternId },
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialDisabledButtons },
        ]
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handlePatternChange,
}
