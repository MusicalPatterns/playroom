import { keyExistsOnObject } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialPageState } from './initial'
import { ImmutablePageState, PageAction, PageStateKey } from './types'

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
