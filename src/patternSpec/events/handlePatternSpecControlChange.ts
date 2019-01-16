import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const handlePatternSpecControlChange: PatternSpecControlEventHandler =
    (patternSpecControlEventHandlerParameters: PatternSpecControlEventHandlerParameters): void => {
        const {
            dispatch,
            patternSpecKey,
            patternSpecValue,
            patternSpecState,
            select,
        }: PatternSpecControlEventHandlerParameters = patternSpecControlEventHandlerParameters

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_CONTROLS)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const updatedStringifiedPatternSpec: StringifiedPatternSpec = {
            ...displayedPatternSpec,
            [ patternSpecKey ]: select ? JSON.stringify(patternSpecValue) : patternSpecValue,
        }

        const updatedInvalidControls: StringifiedPatternSpecControlStates = {
            ...invalidPatternSpecControls,
            [ patternSpecKey ]: false,
        }

        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]
        const updatedDisabledButtons: StringifiedPatternSpecControlStates = {
            ...disabledPatternSpecButtons,
            [ patternSpecKey ]:
            currentPatternSpecValue === (select ? JSON.stringify(patternSpecValue) : patternSpecValue),
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: updatedStringifiedPatternSpec },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_CONTROLS, data: updatedInvalidControls },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
        ])
        dispatch(batchedAction)
    }

export {
    handlePatternSpecControlChange,
}
