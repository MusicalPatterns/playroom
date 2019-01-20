import { PatternSpec } from '@musical-patterns/pattern'
import { ActionType } from '../../root'
import { DomValue } from '../../types'
import { PatternSpecStateKeys } from '../state'
import { PatternSpecControlBooleanStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const handlePatternSpecControlBlur: PatternSpecControlEventHandler =
    (patternSpecHandlerParameters: PatternSpecControlEventHandlerParameters): void => {
        const {
            patternSpecKey,
            patternSpecValue,
            dispatch,
            patternSpecState,
        }: PatternSpecControlEventHandlerParameters = patternSpecHandlerParameters
        const submittedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)
        const unsubmittedPatternSpecControls: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const currentPatternSpecValue: DomValue = submittedPatternSpec[ patternSpecKey ] as DomValue

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
