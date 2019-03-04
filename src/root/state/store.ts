// tslint:disable no-any

import { Map } from 'immutable'
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { combineReducers } from 'redux-immutable'
import { leftColumnReducer } from '../../leftColumn'
import { middleColumnReducer } from '../../middleColumn'
import { rightColumnReducer } from '../../rightColumn'
import { RootStateKey } from './types'

const initialState: any = Map()

const rootReducer: Reducer = combineReducers({
    [ RootStateKey.LEFT_COLUMN ]: leftColumnReducer,
    [ RootStateKey.RIGHT_COLUMN ]: rightColumnReducer,
    [ RootStateKey.MIDDLE_COLUMN ]: middleColumnReducer,
} as any)

// @ts-ignore
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store = createStore(
    enableBatching(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
    rootReducer,
}
