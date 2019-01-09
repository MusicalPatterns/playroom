import { PatternSpec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { buildInitialDisabledButtons } from './buildInitialDisabledButtons'
import { stringifyPatternSpec } from './stringifyPatternSpec'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, patternId, patterns }: HandleResetParameters) => void =
    ({ dispatch, patternId, patterns }: HandleResetParameters): void => {
        const patternSpec: PatternSpec = patterns[ patternId ].spec

        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
        const initialDisabledButtons: StringifiedPatternSpecInputStates = buildInitialDisabledButtons(patternSpec)

        const invalidInputsAccumulator: StringifiedPatternSpecInputStates = {}
        const initialInvalidAndUnsubmittedButtons: StringifiedPatternSpecInputStates = Object.keys(patternSpec)
            .reduce(
                (accumulator: StringifiedPatternSpecInputStates, key: string): StringifiedPatternSpecInputStates =>
                    ({
                        ...accumulator,
                        [ key ]: false,
                    }),
                invalidInputsAccumulator,
            )

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
