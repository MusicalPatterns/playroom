import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'
import { pageReducer } from './page'
import { performerReducer } from './performer'
import { specReducer } from './spec'
import { StateKey } from './types'

const rootReducer: Reducer = combineReducers({
    [ StateKey.PAGE ]: pageReducer,
    [ StateKey.PERFORMER ]: performerReducer,
    [ StateKey.SPEC ]: specReducer,
})

export {
    rootReducer,
}
