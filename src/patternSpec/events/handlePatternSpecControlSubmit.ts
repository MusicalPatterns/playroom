import { AnyPatternSpecAttributes } from '@musical-patterns/pattern'
import { deepEqual, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { InvalidPatternSpecMessages, StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
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
        const invalidPatternSpecMessages: InvalidPatternSpecMessages =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const patternSpecAttributes: AnyPatternSpecAttributes =
            patternSpecState.get(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES)

        const updatedPatternSpec: StringifiedPatternSpec = {
            ...submittedPatternSpec,
            [ patternSpecKey ]: patternSpecValue,
        }
        if (deepEqual(submittedPatternSpec, updatedPatternSpec)) {
            return
        }

        const invalidMessage: Maybe<string> = validate(patternSpecValue, patternSpecAttributes[ patternSpecKey ])
        if (!invalidMessage) {
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
            const updatedInvalidMessages: InvalidPatternSpecMessages = {
                ...invalidPatternSpecMessages,
                [ patternSpecKey ]: invalidMessage,
            }
            dispatch({ type: ActionType.SET_INVALID_PATTERN_SPEC_MESSAGES, data: updatedInvalidMessages })
        }
    }

export {
    handlePatternSpecControlSubmit,
}
