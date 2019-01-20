import { AnyPatternSpec } from '@musical-patterns/pattern'
import { ActionType } from '../../root'
import { PatternSpecStateKeys } from '../state'
import { PatternSpecControlBooleanStates, PatternSpecValue } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const handlePatternSpecControlBlur: PatternSpecControlEventHandler =
    (patternSpecHandlerParameters: PatternSpecControlEventHandlerParameters): void => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        }: PatternSpecControlEventHandlerParameters = patternSpecHandlerParameters
        const submittedPatternSpec: AnyPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const unsubmittedPatternSpecControls: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const currentPatternSpecValue: PatternSpecValue = submittedPatternSpec[ patternSpecKey ] as PatternSpecValue

        const updatedUnsubmittedControls: PatternSpecControlBooleanStates = {
            ...unsubmittedPatternSpecControls,
            [ patternSpecKey ]:
            currentPatternSpecValue !== patternSpecValue,
        }

        dispatch({ type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: updatedUnsubmittedControls })
    }

export {
    handlePatternSpecControlBlur,
}
