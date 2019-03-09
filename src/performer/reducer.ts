import { BEGINNING, isUndefined, keyExistsOnObject, noop, typedMap } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { ImmutablePerformerState, PerformerAction, PerformerStateKey } from './types'

const initialPerformerState: ImmutablePerformerState = typedMap({
    [ PerformerStateKey.PAUSED ]: true,
    [ PerformerStateKey.TIME_POSITION ]: BEGINNING,
    [ PerformerStateKey.PATTERN_DURATION ]: BEGINNING,
    [ PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: { enterImmersiveAudio: noop, exitImmersiveAudio: noop },
    [ PerformerStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ PerformerStateKey.PERFORMER_DISABLED ]: true,
})

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