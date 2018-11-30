import { Reducer } from 'redux'
import { initialPatternSpecState } from './state'
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
            case PatternSpecStateActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS: {
                return patternSpecState.set(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS, action.data)
            }
            case PatternSpecStateActionType.SET_SUBMITTED_PATTERN_SPEC: {
                return patternSpecState.set(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC, action.data)
            }
            case PatternSpecStateActionType.SET_DISPLAYED_PATTERN_SPEC: {
                return patternSpecState.set(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC, action.data)
            }
            case PatternSpecStateActionType.SET_INVALID_PATTERN_SPEC_INPUTS: {
                return patternSpecState.set(PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS, action.data)
            }
            case PatternSpecStateActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS: {
                return patternSpecState.set(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS, action.data)
            }
            default: {
                return patternSpecState
            }
        }
    }

export {
    patternSpecReducer,
}
