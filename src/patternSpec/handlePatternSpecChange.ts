import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, PatternSpecStateKeys, StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../state'
import { PatternSpecEventHandler, PatternSpecEventHandlerParameters } from './types'

const handlePatternSpecChange: PatternSpecEventHandler =
    (patternSpecHandlerParameters: PatternSpecEventHandlerParameters): void => {
        const {
            dispatch,
            patternSpecKey,
            patternSpecValue,
            patternSpecState,
        }: PatternSpecEventHandlerParameters = patternSpecHandlerParameters
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
            [ patternSpecKey ]: patternSpecValue,
        }

        const updatedInvalidInputs: StringifiedPatternSpecInputStates = {
            ...invalidPatternSpecInputs,
            [ patternSpecKey ]: false,
        }

        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]
        const updatedDisabledButtons: StringifiedPatternSpecInputStates = {
            ...disabledPatternSpecButtons,
            [ patternSpecKey ]: currentPatternSpecValue === patternSpecValue,
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: updatedStringifiedPatternSpec },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: updatedInvalidInputs },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
        ])
        dispatch(batchedAction)
    }

export {
    handlePatternSpecChange,
}
