import { computeReducer } from '@musical-patterns/utilities'
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { combineReducers } from 'redux-immutable'
import { initialPageState } from './page'
import { patternReducer } from './pattern'
import { Action, ImmutableState, StateKey } from './types'

// @ts-ignore
// tslint:disable-next-line no-any
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer: Reducer = combineReducers({
    [ StateKey.PATTERN ]: patternReducer,
    [ StateKey.PAGE ]: computeReducer({ initialState: initialPageState }),
})

const store: Store<ImmutableState, Action> = createStore(
    enableBatching(rootReducer),
    undefined,
    composeEnhancers(applyMiddleware(batchDispatchMiddleware)),
)

export {
    store,
    rootReducer,
}
