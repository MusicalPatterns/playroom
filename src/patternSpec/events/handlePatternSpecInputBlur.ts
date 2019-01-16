import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { PatternSpecInputEventHandler, PatternSpecInputEventHandlerParameters } from './types'

const handlePatternSpecInputBlur: PatternSpecInputEventHandler =
    (patternSpecHandlerParameters: PatternSpecInputEventHandlerParameters): void => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
            select,
        }: PatternSpecInputEventHandlerParameters = patternSpecHandlerParameters
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const unsubmittedPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS)
        const currentPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const updatedUnsubmittedInputs: StringifiedPatternSpecInputStates = {
            ...unsubmittedPatternSpecInputs,
            [ patternSpecKey ]:
            currentPatternSpecValue !== (select ? JSON.stringify(patternSpecValue) : patternSpecValue),
        }

        dispatch({ type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: updatedUnsubmittedInputs })
    }

export {
    handlePatternSpecInputBlur,
}
