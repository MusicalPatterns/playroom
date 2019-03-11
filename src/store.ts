import { computeReducer } from '@musical-patterns/utilities'
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions'
import { combineReducers } from 'redux-immutable'
import { initialMaterialState } from './material'
import { initialMetadataState } from './metadata'
import { initialPageState } from './page'
import { initialSpecState } from './spec'
import { Action, ImmutableState, StateKey } from './types'

// @ts-ignore
// tslint:disable-next-line no-any
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer: Reducer = combineReducers({
    [ StateKey.METADATA ]: computeReducer({ initialState: initialMetadataState }),
    [ StateKey.PAGE ]: computeReducer({ initialState: initialPageState }),
    [ StateKey.MATERIAL ]: computeReducer({ initialState: initialMaterialState }),
    [ StateKey.SPEC ]: computeReducer({ initialState: initialSpecState }),
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
