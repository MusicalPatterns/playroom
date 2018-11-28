import { ActionType, PatternSpecStateKeys, StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../state'
import { PatternSpecEventHandler, PatternSpecEventHandlerParameters } from './types'

const handlePatternSpecBlur: PatternSpecEventHandler =
    (patternSpecHandlerParameters: PatternSpecEventHandlerParameters): void => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        }: PatternSpecEventHandlerParameters = patternSpecHandlerParameters
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const unsubmittedPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS)
        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const updatedUnsubmittedInputs: StringifiedPatternSpecInputStates = {
            ...unsubmittedPatternSpecInputs,
            [ patternSpecKey ]: currentPatternSpecValue !== patternSpecValue,
        }

        dispatch({ type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: updatedUnsubmittedInputs })
    }

export {
    handlePatternSpecBlur,
}
