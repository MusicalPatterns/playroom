// tslint:disable no-any

import { Map } from 'immutable'
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { combineReducers } from 'redux-immutable'
import { pageReducer } from '../../page'
import { performerReducer } from '../../performer'
import { specReducer } from '../../spec'
import { RootStateKey } from './types'

const initialState: any = Map()

const rootReducer: Reducer = combineReducers({
    [ RootStateKey.PAGE ]: pageReducer,
    [ RootStateKey.PERFORMER ]: performerReducer,
    [ RootStateKey.SPEC ]: specReducer,
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
