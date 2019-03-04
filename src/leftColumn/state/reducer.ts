import { Reducer } from 'redux'
import { initialLeftColumnState } from './initial'
import {
    ImmutableLeftColumnState,
    LeftColumnStateAction,
    LeftColumnStateActionMap,
    LeftColumnStateActionType,
    LeftColumnStateKey,
} from './types'

const leftColumnReducer: Reducer<ImmutableLeftColumnState, LeftColumnStateAction> =
    (
        leftColumnState: ImmutableLeftColumnState = initialLeftColumnState,
        action: LeftColumnStateAction,
    ): ImmutableLeftColumnState => {
        const actionMap: LeftColumnStateActionMap = {
            [ LeftColumnStateActionType.SET_PATTERNS ]: LeftColumnStateKey.PATTERNS,
            [ LeftColumnStateActionType.SET_PATTERN_ID ]: LeftColumnStateKey.PATTERN_ID,
            [ LeftColumnStateActionType.SET_DEBUG_MODE ]: LeftColumnStateKey.DEBUG_MODE,
            [ LeftColumnStateActionType.SET_LEFT_COLUMN_OPEN ]: LeftColumnStateKey.LEFT_COLUMN_OPEN,
            [ LeftColumnStateActionType.SET_PAGE_NAME ]: LeftColumnStateKey.PAGE_NAME,
        }

        if (actionMap[ action.type ]) {
            return leftColumnState.set(actionMap[ action.type ], action.data)
        }

        return leftColumnState
    }

export {
    leftColumnReducer,
}
