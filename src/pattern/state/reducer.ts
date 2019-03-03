import { Reducer } from 'redux'
import { initialPatternState } from './initial'
import {
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionMap,
    PatternStateActionType,
    PatternStateKey,
} from './types'

const patternReducer: Reducer<ImmutablePatternState, PatternStateAction> =
    (patternState: ImmutablePatternState = initialPatternState, action: PatternStateAction): ImmutablePatternState => {
        const actionMap: PatternStateActionMap = {
            [ PatternStateActionType.SET_PATTERNS ]: PatternStateKey.PATTERNS,
            [ PatternStateActionType.SET_PATTERN_ID ]: PatternStateKey.ID,
            [ PatternStateActionType.SET_DEBUG_MODE ]: PatternStateKey.DEBUG_MODE,
            [ PatternStateActionType.SET_LEFT_COLUMN_OPEN ]: PatternStateKey.LEFT_COLUMN_OPEN,
            [ PatternStateActionType.SET_RIGHT_COLUMN_OPEN ]: PatternStateKey.RIGHT_COLUMN_OPEN,
            [ PatternStateActionType.SET_PAGE_NAME ]: PatternStateKey.PAGE_NAME,
        }

        if (actionMap[ action.type ]) {
            return patternState.set(actionMap[ action.type ], action.data)
        }

        return patternState
    }

export {
    patternReducer,
}
