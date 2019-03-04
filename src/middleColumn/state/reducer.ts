import { Reducer } from 'redux'
import { initialMiddleColumnState } from './initial'
import {
    ImmutableMiddleColumnState,
    MiddleColumnStateAction,
    MiddleColumnStateActionMap,
    MiddleColumnStateActionType,
    MiddleColumnStateKey,
} from './types'

const middleColumnReducer: Reducer<ImmutableMiddleColumnState, MiddleColumnStateAction> =
    (
        middleColumnState: ImmutableMiddleColumnState = initialMiddleColumnState,
        action: MiddleColumnStateAction,
    ): ImmutableMiddleColumnState => {
        const actionMap: MiddleColumnStateActionMap = {
            [ MiddleColumnStateActionType.SET_PAUSED ]: MiddleColumnStateKey.PAUSED,
            [ MiddleColumnStateActionType.SET_TIME_POSITION ]: MiddleColumnStateKey.TIME_POSITION,
            [ MiddleColumnStateActionType.SET_PATTERN_DURATION ]: MiddleColumnStateKey.PATTERN_DURATION,
            [ MiddleColumnStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]:
            MiddleColumnStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS,
            [ MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_READY ]: MiddleColumnStateKey.IMMERSIVE_AUDIO_READY,
            [ MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_UNAVAILABLE ]:
            MiddleColumnStateKey.IMMERSIVE_AUDIO_UNAVAILABLE,
            [ MiddleColumnStateActionType.SET_PERFORMER_DISABLED ]: MiddleColumnStateKey.PERFORMER_DISABLED,
            [ MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_ENABLED ]: MiddleColumnStateKey.IMMERSIVE_AUDIO_ENABLED,
        }

        if (actionMap[ action.type ]) {
            return middleColumnState.set(actionMap[ action.type ], action.data)
        }

        return middleColumnState
    }

export {
    middleColumnReducer,
}
