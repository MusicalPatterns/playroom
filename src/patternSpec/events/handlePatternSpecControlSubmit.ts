import { PatternSpecAttributes } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'
import { validate } from './validate'

const handlePatternSpecControlSubmit: PatternSpecControlEventHandler =
    async (patternSpecControlEventHandlerParameters: PatternSpecControlEventHandlerParameters): Promise<void> => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        } = patternSpecControlEventHandlerParameters

        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const invalidPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_CONTROLS)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const patternSpecAttributes: PatternSpecAttributes =
            patternSpecState.get(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES)

        const updatedPatternSpec: StringifiedPatternSpec = {
            ...submittedPatternSpec,
            [ patternSpecKey ]: patternSpecValue,
        }
        if (deepEqual(submittedPatternSpec, updatedPatternSpec)) {
            return
        }

        const valid: boolean = validate(patternSpecValue, patternSpecAttributes[ patternSpecKey ])
        if (valid) {
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
        else {
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
