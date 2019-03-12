import { computeReducer } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { combineReducers } from 'redux-immutable'
import { initialIdState } from './id'
import { initialMaterialState } from './material'
import { initialMetadataState } from './metadata'
import { initialSpecState } from './spec'
import { PatternStateKey } from './types'

const patternReducer: Reducer = combineReducers({
    [ PatternStateKey.ID ]: computeReducer({ initialState: initialIdState }),
    [ PatternStateKey.METADATA ]: computeReducer({ initialState: initialMetadataState }),
    [ PatternStateKey.MATERIAL ]: computeReducer({ initialState: initialMaterialState }),
    [ PatternStateKey.SPEC ]: computeReducer({ initialState: initialSpecState }),
})

export {
    patternReducer,
}
