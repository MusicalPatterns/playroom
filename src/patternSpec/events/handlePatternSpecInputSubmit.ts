import { deepEqual } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { PatternSpecInputEventHandler, PatternSpecInputEventHandlerParameters } from './types'

const validateValueByThrowingIfUnparsable: (patternSpecValue: string) => void =
    (patternSpecValue: string): void => {
        JSON.parse(patternSpecValue)
    }

const handlePatternSpecInputSubmit: PatternSpecInputEventHandler =
    async (patternSpecInputEventHandlerParameters: PatternSpecInputEventHandlerParameters): Promise<void> => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
            select,
        } = patternSpecInputEventHandlerParameters

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
            [ patternSpecKey ]: select ? JSON.stringify(patternSpecValue) : patternSpecValue,
            // [ patternSpecKey ]: patternSpecValue,
        }
        if (deepEqual(submittedPatternSpec, updatedPatternSpec)) {
            return
        }

        try {
            if (!select) {
                validateValueByThrowingIfUnparsable(patternSpecValue)
            }

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
    handlePatternSpecInputSubmit,
}
