import { Reducer } from 'redux'
import { initialPatternSpecState } from './initial'
import {
    ImmutablePatternSpecState,
    PatternSpecStateAction,
    PatternSpecStateActionType,
    PatternSpecStateKeys,
} from './types'

const patternSpecReducer: Reducer<ImmutablePatternSpecState, PatternSpecStateAction> =
    // tslint:disable-next-line:cyclomatic-complexity
    (
        patternSpecState: ImmutablePatternSpecState = initialPatternSpecState,
        action: PatternSpecStateAction,
    ): ImmutablePatternSpecState => {
        switch (action.type) {
            case PatternSpecStateActionType.SET_DEFAULT_PATTERN_SPEC: {
                return patternSpecState.set(PatternSpecStateKeys.DEFAULT_PATTERN_SPEC, action.data)
            }
            case PatternSpecStateActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS: {
                return patternSpecState.set(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS, action.data)
            }
            case PatternSpecStateActionType.SET_SUBMITTED_PATTERN_SPEC: {
                return patternSpecState.set(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC, action.data)
            }
            case PatternSpecStateActionType.SET_DISPLAYED_PATTERN_SPEC: {
                return patternSpecState.set(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC, action.data)
            }
            case PatternSpecStateActionType.SET_INVALID_PATTERN_SPEC_MESSAGES: {
                return patternSpecState.set(PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES, action.data)
            }
            case PatternSpecStateActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS: {
                return patternSpecState.set(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS, action.data)
            }
            case PatternSpecStateActionType.SET_PATTERN_SPEC_ATTRIBUTES: {
                return patternSpecState.set(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES, action.data)
            }
            case PatternSpecStateActionType.SET_VALIDATION_FUNCTION: {
                return patternSpecState.set(PatternSpecStateKeys.VALIDATION_FUNCTION, action.data)
            }
            default: {
                return patternSpecState
            }
        }
    }

export {
    patternSpecReducer,
}
