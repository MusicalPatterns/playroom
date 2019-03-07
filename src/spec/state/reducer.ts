import { keyExistsOnObject } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialSpecState } from './initial'
import { ImmutableSpecState, SpecAction, SpecStateKey } from './types'

const specReducer: Reducer<ImmutableSpecState, SpecAction> =
    (specState: ImmutableSpecState = initialSpecState, action: SpecAction): ImmutableSpecState => {
        if (!keyExistsOnObject(action.type, SpecStateKey)) {
            return specState
        }

        return specState.set(action.type, action.data)
    }

export {
    specReducer,
}
