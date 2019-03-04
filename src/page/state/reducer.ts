import { Reducer } from 'redux'
import { initialPageState } from './initial'
import {
    ImmutablePageState,
    PageStateAction,
    PageStateActionMap,
    PageStateActionType,
    PageStateKey,
} from './types'

const pageReducer: Reducer<ImmutablePageState, PageStateAction> =
    (pageState: ImmutablePageState = initialPageState, action: PageStateAction): ImmutablePageState => {
        const actionMap: PageStateActionMap = {
            [ PageStateActionType.SET_PATTERNS ]: PageStateKey.PATTERNS,
            [ PageStateActionType.SET_PATTERN_ID ]: PageStateKey.PATTERN_ID,
            [ PageStateActionType.SET_DEBUG_MODE ]: PageStateKey.DEBUG_MODE,
            [ PageStateActionType.SET_LEFT_COLUMN_OPEN ]: PageStateKey.LEFT_COLUMN_OPEN,
            [ PageStateActionType.SET_RIGHT_COLUMN_OPEN ]: PageStateKey.RIGHT_COLUMN_OPEN,
            [ PageStateActionType.SET_PAGE_NAME ]: PageStateKey.PAGE_NAME,
        }

        if (actionMap[ action.type ]) {
            return pageState.set(actionMap[ action.type ], action.data)
        }

        return pageState
    }

export {
    pageReducer,
}
