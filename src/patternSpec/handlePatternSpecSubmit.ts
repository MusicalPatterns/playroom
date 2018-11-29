import { deepEqual } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, PatternSpecStateKeys, StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../state'
import { PatternSpecEventHandler, PatternSpecEventHandlerParameters } from './types'

const validateValueByThrowingIfUnparsable: (patternSpecValue: string) => void =
    (patternSpecValue: string): void => {
        JSON.parse(patternSpecValue)
    }

const handlePatternSpecSubmit: PatternSpecEventHandler =
    async (patternSpecHandlerParameters: PatternSpecEventHandlerParameters): Promise<void> => {
        const { patternSpecKey, patternSpecValue, dispatch, patternSpecState } = patternSpecHandlerParameters
        const unsubmittedPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS)
        const invalidPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS)
        const disabledPatternSpecButtons: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const updatedPatternSpec: StringifiedPatternSpec = {
            ...submittedPatternSpec,
            [ patternSpecKey ]: patternSpecValue,
        }
        if (deepEqual(submittedPatternSpec, updatedPatternSpec)) {
            return
        }

        try {
            validateValueByThrowingIfUnparsable(patternSpecValue)

            const updatedUnsubmittedInputs: StringifiedPatternSpecInputStates = {
                ...unsubmittedPatternSpecInputs,
                [ patternSpecKey ]: false,
            }

            const updatedDisabledButtons: StringifiedPatternSpecInputStates = {
                ...disabledPatternSpecButtons,
                [ patternSpecKey ]: true,
            }

            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: updatedPatternSpec },
                { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: updatedUnsubmittedInputs },
                { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
            ])
            dispatch(batchedAction)
        }
        catch (e) {
            const updatedInvalidInputs: StringifiedPatternSpecInputStates = {
                ...invalidPatternSpecInputs,
                [ patternSpecKey ]: true,
            }
            dispatch({ type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: updatedInvalidInputs })
        }
    }

export {
    handlePatternSpecSubmit,
}
