import { isUndefined, keyExistsOnObject } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialPerformerState } from './initial'
import { ImmutablePerformerState, PerformerAction, PerformerStateKey } from './types'

const performerReducer: Reducer<ImmutablePerformerState, PerformerAction> =
    (
        performerState: ImmutablePerformerState = initialPerformerState,
        action: PerformerAction,
    ): ImmutablePerformerState => {
        if (!keyExistsOnObject(action.type, PerformerStateKey)) {
            return performerState
        }

        if (isUndefined(action.data)) {
            return performerState
        }

        return performerState.set(action.type, action.data)
    }

export {
    performerReducer,
}
