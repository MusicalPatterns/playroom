import { Reducer } from 'redux'
import { initialPatternState } from './initial'
import { ImmutablePatternState, PatternStateAction, PatternStateActionType, PatternStateKeys } from './types'

const patternReducer: Reducer<ImmutablePatternState, PatternStateAction> =
    // tslint:disable-next-line cyclomatic-complexity
    (patternsState: ImmutablePatternState = initialPatternState, action: PatternStateAction): ImmutablePatternState => {
        switch (action.type) {
            case PatternStateActionType.SET_PATTERNS: {
                return patternsState.set(PatternStateKeys.PATTERNS, action.data)
            }
            case PatternStateActionType.SET_PATTERN_ID: {
                return patternsState.set(PatternStateKeys.ID, action.data)
            }
            case PatternStateActionType.SET_DEBUG_MODE: {
                return patternsState.set(PatternStateKeys.DEBUG_MODE, action.data)
            }
            case PatternStateActionType.SET_LEFT_COLUMN_OPEN: {
                return patternsState.set(PatternStateKeys.LEFT_COLUMN_OPEN, action.data)
            }
            case PatternStateActionType.SET_RIGHT_COLUMN_OPEN: {
                return patternsState.set(PatternStateKeys.RIGHT_COLUMN_OPEN, action.data)
            }
            case PatternStateActionType.SET_PAGE_NAME: {
                return patternsState.set(PatternStateKeys.PAGE_NAME, action.data)
            }

            default: {
                return patternsState
            }
        }
    }

export {
    patternReducer,
}
