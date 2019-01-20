import { PatternSpec, PatternSpecAttributes, PatternSpecValidationFunction } from '@musical-patterns/pattern'
import { deepEqual, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { PatternSpecControlBooleanStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const handlePatternSpecControlSubmit: PatternSpecControlEventHandler =
    async (patternSpecControlEventHandlerParameters: PatternSpecControlEventHandlerParameters): Promise<void> => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        } = patternSpecControlEventHandlerParameters

        const unsubmittedPatternSpecControls: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const disabledPatternSpecButtons: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const patternSpecAttributes: PatternSpecAttributes =
            patternSpecState.get(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES)
        const validationFunction: Maybe<PatternSpecValidationFunction> =
            patternSpecState.get(PatternSpecStateKeys.VALIDATION_FUNCTION)

        const updatedPatternSpec: PatternSpec = {
            ...submittedPatternSpec,
            [ patternSpecKey ]: patternSpecValue,
        }

        if (deepEqual(submittedPatternSpec, updatedPatternSpec)) {
            return
        }

        const { isValid, updatedInvalidMessages } = validateSubmittedSpec({
            patternSpecAttributes,
            patternSpecKey,
            updatedPatternSpec,
            validationFunction,
        })

        const actions: Action[] = [
            { type: ActionType.SET_INVALID_PATTERN_SPEC_MESSAGES, data: updatedInvalidMessages },
        ]

        if (isValid) {
            const updatedUnsubmittedControls: PatternSpecControlBooleanStates = {
                ...unsubmittedPatternSpecControls,
                [ patternSpecKey ]: false,
            }

            const updatedDisabledButtons: PatternSpecControlBooleanStates = {
                ...disabledPatternSpecButtons,
                [ patternSpecKey ]: true,
            }

            actions.push({ type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: updatedPatternSpec })
            actions.push({ type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: updatedUnsubmittedControls })
            actions.push({ type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons })
        }

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handlePatternSpecControlSubmit,
}
