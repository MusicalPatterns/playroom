import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const handlePatternSpecControlBlur: PatternSpecControlEventHandler =
    (patternSpecHandlerParameters: PatternSpecControlEventHandlerParameters): void => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        }: PatternSpecControlEventHandlerParameters = patternSpecHandlerParameters
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const updatedUnsubmittedControls: StringifiedPatternSpecControlStates = {
            ...unsubmittedPatternSpecControls,
            [ patternSpecKey ]:
            currentPatternSpecValue !== patternSpecValue,
        }

        dispatch({ type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: updatedUnsubmittedControls })
    }

export {
    handlePatternSpecControlBlur,
}
