// tslint:disable no-any

import { Map } from 'immutable'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { BatchAction, batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { rootReducer } from './reducer'
import { Action, ImmutableState } from './types'

const initialState: any = Map()

// @ts-ignore
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<ImmutableState, Action | BatchAction> = createStore(
    enableBatching(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
    rootReducer,
}
