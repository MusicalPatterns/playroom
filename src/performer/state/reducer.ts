import { Reducer } from 'redux'
import { initialPerformerState } from './initial'
import { ImmutablePerformerState, PerformerStateAction, PerformerStateActionType, PerformerStateKeys } from './types'

const performerReducer: Reducer<ImmutablePerformerState, PerformerStateAction> =
    // tslint:disable-next-line:cyclomatic-complexity
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
            case PerformerStateActionType.SET_PAUSED: {
                return performerState.set(PerformerStateKeys.PAUSED, action.data)
            }
            case PerformerStateActionType.SET_TIME: {
                return performerState.set(PerformerStateKeys.TIME, action.data)
            }
            case PerformerStateActionType.SET_TOTAL_DURATION: {
                return performerState.set(PerformerStateKeys.TOTAL_DURATION, action.data)
            }
            case PerformerStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLER: {
                return performerState.set(PerformerStateKeys.TOGGLE_IMMERSIVE_AUDIO_HANDLER, action.data)
            }
            case PerformerStateActionType.SET_IMMERSIVE_AUDIO_READY: {
                return performerState.set(PerformerStateKeys.IMMERSIVE_AUDIO_READY, true)
            }
            case PerformerStateActionType.TOGGLE_IMMERSIVE_AUDIO: {
                return performerState.set(
                    PerformerStateKeys.IMMERSIVE_AUDIO,
                    !performerState.get(PerformerStateKeys.IMMERSIVE_AUDIO),
                )
            }
            default: {
                return performerState
            }
        }
    }

export {
    performerReducer,
}
