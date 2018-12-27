import { Reducer } from 'redux'
import { initialPatternState } from './initial'
import { ImmutablePatternState, PatternStateAction, PatternStateActionType, PatternStateKeys } from './types'

const patternReducer: Reducer<ImmutablePatternState, PatternStateAction> =
    (patternsState: ImmutablePatternState = initialPatternState, action: PatternStateAction): ImmutablePatternState => {
        switch (action.type) {
            case PatternStateActionType.SET_PATTERNS: {
                return patternsState.set(PatternStateKeys.PATTERNS, action.data)
            }

            case PatternStateActionType.SET_PATTERN_ID: {
                return patternsState.set(PatternStateKeys.PATTERN_ID, action.data)
            }

            case PatternStateActionType.SET_DEBUG_MODE: {
                return patternsState.set(PatternStateKeys.DEBUG_MODE, action.data)
            }

            default: {
                return patternsState
            }
        }
    }

export {
    patternReducer,
}
