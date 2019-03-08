import { keyExistsOnObject, typedMap } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { ImmutablePageState, PageAction, PageState, PageStateKey } from './types'

const initialPageState: ImmutablePageState = typedMap<PageState>({
    [ PageStateKey.PATTERNS ]: undefined,
    [ PageStateKey.PATTERN_ID ]: undefined,
    [ PageStateKey.DEBUG_MODE ]: false,
    [ PageStateKey.LEFT_COLUMN_OPEN ]: true,
    [ PageStateKey.RIGHT_COLUMN_OPEN ]: false,
    [ PageStateKey.PAGE_NAME ]: undefined,
})

const pageReducer: Reducer<ImmutablePageState, PageAction> =
    (pageState: ImmutablePageState = initialPageState, action: PageAction): ImmutablePageState => {
        if (!keyExistsOnObject(action.type, PageStateKey)) {
            return pageState
        }

        return pageState.set(action.type, action.data)
    }

export {
    pageReducer,
}
