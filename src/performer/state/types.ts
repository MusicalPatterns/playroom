import { Time, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME = 'SET_TIME',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
    SET_ENTER_IMMERSIVE_AUDIO_HANDLER = 'SET_ENTER_IMMERSIVE_AUDIO_HANDLER',
}

interface SetPaused {
    type: PerformerStateActionType.TOGGLE_PAUSED,
}

interface SetTime {
    data: Time,
    type: PerformerStateActionType.SET_TIME,
}

interface SetEnterImmersiveAudioHandler {
    data: VoidFunction,
    type: PerformerStateActionType.SET_ENTER_IMMERSIVE_AUDIO_HANDLER,
}

type PerformerStateAction =
    SetPaused |
    SetTime |
    SetEnterImmersiveAudioHandler

enum PerformerStateKeys {
    TIME = 'time',
    PAUSED = 'paused',
    ENTER_IMMERSIVE_AUDIO_HANDLER = 'enterImmersiveAudioHandler',
}

interface PerformerState {
    [ PerformerStateKeys.TIME ]: Time,
    [ PerformerStateKeys.PAUSED ]: boolean,
    [ PerformerStateKeys.ENTER_IMMERSIVE_AUDIO_HANDLER ]: VoidFunction,
}

type PerformerStateValueTypes =
    Time |
    boolean |
    VoidFunction

type ImmutablePerformerState = TypedMap<PerformerStateValueTypes, PerformerState>

export {
    ImmutablePerformerState,
    PerformerStateAction,
    PerformerStateActionType,
    PerformerStateKeys,
}
