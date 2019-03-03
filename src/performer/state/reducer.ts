import { Reducer } from 'redux'
import { initialPerformerState } from './initial'
import {
    ImmutablePerformerState,
    PerformerStateAction,
    PerformerStateActionMap,
    PerformerStateActionType,
    PerformerStateKey,
} from './types'

const performerReducer: Reducer<ImmutablePerformerState, PerformerStateAction> =
    (
        performerState: ImmutablePerformerState = initialPerformerState,
        action: PerformerStateAction,
    ): ImmutablePerformerState => {
        const actionMap: PerformerStateActionMap = {
            [ PerformerStateActionType.SET_PAUSED ]: PerformerStateKey.PAUSED,
            [ PerformerStateActionType.SET_TIME_POSITION ]: PerformerStateKey.TIME_POSITION,
            [ PerformerStateActionType.SET_PATTERN_DURATION ]: PerformerStateKey.PATTERN_DURATION,
            [ PerformerStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]:
            PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS,
            [ PerformerStateActionType.SET_IMMERSIVE_AUDIO_READY ]: PerformerStateKey.IMMERSIVE_AUDIO_READY,
            [ PerformerStateActionType.SET_IMMERSIVE_AUDIO_UNAVAILABLE ]: PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE,
            [ PerformerStateActionType.SET_PERFORMER_DISABLED ]: PerformerStateKey.PERFORMER_DISABLED,
            [ PerformerStateActionType.SET_IMMERSIVE_AUDIO_ENABLED ]: PerformerStateKey.IMMERSIVE_AUDIO_ENABLED,
        }

        if (actionMap[ action.type ]) {
            return performerState.set(actionMap[ action.type ], action.data)
        }

        return performerState
    }

export {
    performerReducer,
}
