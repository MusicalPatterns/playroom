import { PatternSpec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { buildInitialStringifiedPatternSpecInputStates } from './buildInitialStringifiedPatternSpecInputStates'
import { stringifyPatternSpec } from './stringifyPatternSpec'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, patternId, patterns }: HandleResetParameters) => void =
    ({ dispatch, patternId, patterns }: HandleResetParameters): void => {
        const patternSpec: PatternSpec = patterns[ patternId ].spec

        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
        const initialDisabledButtons: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(patternSpec, true)
        const initialInvalidAndUnsubmittedButtons: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(patternSpec, false)

        const actions: Action[] = [
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialDisabledButtons },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: initialInvalidAndUnsubmittedButtons },
            { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: initialInvalidAndUnsubmittedButtons },
        ]
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
