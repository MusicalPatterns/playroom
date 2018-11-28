import { Reducer } from 'redux'
import { initialPerformerState } from './state'
import { ImmutablePerformerState, PerformerStateAction, PerformerStateActionType, PerformerStateKeys } from './types'

const performerReducer: Reducer<ImmutablePerformerState, PerformerStateAction> =
    (
        performerState: ImmutablePerformerState = initialPerformerState,
        action: PerformerStateAction,
    ): ImmutablePerformerState => {
        switch (action.type) {
            case PerformerStateActionType.TOGGLE_PAUSED: {
                return performerState.set(
                    PerformerStateKeys.PAUSED,
                    !performerState.get(PerformerStateKeys.PAUSED),
                )
            }
            case PerformerStateActionType.SET_TIME: {
                return performerState.set(PerformerStateKeys.TIME, action.data)
            }
            default: {
                return performerState
            }
        }
    }

export {
    performerReducer,
}
