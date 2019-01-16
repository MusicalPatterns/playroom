import { deepEqual } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const validateValueByThrowingIfUnparsable: (patternSpecValue: string) => void =
    (patternSpecValue: string): void => {
        JSON.parse(patternSpecValue)
    }

const handlePatternSpecControlSubmit: PatternSpecControlEventHandler =
    async (patternSpecControlEventHandlerParameters: PatternSpecControlEventHandlerParameters): Promise<void> => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
            select,
        } = patternSpecControlEventHandlerParameters

        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const invalidPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_CONTROLS)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
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

            const updatedUnsubmittedControls: StringifiedPatternSpecControlStates = {
                ...unsubmittedPatternSpecControls,
                [ patternSpecKey ]: false,
            }

            const updatedDisabledButtons: StringifiedPatternSpecControlStates = {
                ...disabledPatternSpecButtons,
                [ patternSpecKey ]: true,
            }

            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: updatedPatternSpec },
                { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: updatedUnsubmittedControls },
                { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
            ])
            dispatch(batchedAction)
        }
        catch (e) {
            const updatedInvalidControls: StringifiedPatternSpecControlStates = {
                ...invalidPatternSpecControls,
                [ patternSpecKey ]: true,
            }
            dispatch({ type: ActionType.SET_INVALID_PATTERN_SPEC_CONTROLS, data: updatedInvalidControls })
        }
    }

export {
    handlePatternSpecControlSubmit,
}
