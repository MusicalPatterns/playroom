import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { PatternSpecInputEventHandler, PatternSpecInputEventHandlerParameters } from './types'

const handlePatternSpecInputChange: PatternSpecInputEventHandler =
    (patternSpecHandlerParameters: PatternSpecInputEventHandlerParameters): void => {
        const {
            dispatch,
            patternSpecKey,
            patternSpecValue,
            patternSpecState,
            select,
        }: PatternSpecInputEventHandlerParameters = patternSpecHandlerParameters

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS)
        const disabledPatternSpecButtons: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const updatedStringifiedPatternSpec: StringifiedPatternSpec = {
            ...displayedPatternSpec,
            [ patternSpecKey ]: select ? JSON.stringify(patternSpecValue) : patternSpecValue,
        }

        const updatedInvalidInputs: StringifiedPatternSpecInputStates = {
            ...invalidPatternSpecInputs,
            [ patternSpecKey ]: false,
        }

        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]
        const updatedDisabledButtons: StringifiedPatternSpecInputStates = {
            ...disabledPatternSpecButtons,
            [ patternSpecKey ]:
            currentPatternSpecValue === (select ? JSON.stringify(patternSpecValue) : patternSpecValue),
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: updatedStringifiedPatternSpec },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: updatedInvalidInputs },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
        ])
        dispatch(batchedAction)
    }

export {
    handlePatternSpecInputChange,
}
