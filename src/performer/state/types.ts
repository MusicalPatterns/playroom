import { Time, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME = 'SET_TIME',
    SET_TOTAL_DURATION = 'SET_TOTAL_DURATION',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
    SET_PAUSED = 'SET_PAUSED',
    SET_TOGGLE_IMMERSIVE_AUDIO_HANDLER = 'SET_TOGGLE_IMMERSIVE_AUDIO_HANDLER',
    SET_IMMERSIVE_AUDIO_READY = 'SET_IMMERSIVE_AUDIO_READY',
    SET_IMMERSIVE_AUDIO_UNAVAILABLE = 'SET_IMMERSIVE_AUDIO_UNAVAILABLE',
    TOGGLE_IMMERSIVE_AUDIO = 'TOGGLE_IMMERSIVE_AUDIO',
}

interface TogglePaused {
    type: PerformerStateActionType.TOGGLE_PAUSED,
}

interface SetPaused {
    data: boolean,
    type: PerformerStateActionType.SET_PAUSED,
}

interface SetTime {
    data: Time,
    type: PerformerStateActionType.SET_TIME,
}

interface SetTotalDuration {
    data: Time,
    type: PerformerStateActionType.SET_TOTAL_DURATION,
}

interface SetToggleImmersiveAudioHandler {
    data: VoidFunction,
    type: PerformerStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLER,
}

interface SetImmersiveAudioReady {
    type: PerformerStateActionType.SET_IMMERSIVE_AUDIO_READY,
}

interface SetImmersiveAudioUnavailable {
    type: PerformerStateActionType.SET_IMMERSIVE_AUDIO_UNAVAILABLE,
}

interface ToggleImmersiveAudio {
    type: PerformerStateActionType.TOGGLE_IMMERSIVE_AUDIO,
}

type PerformerStateAction =
    TogglePaused |
    SetPaused |
    SetTime |
    SetTotalDuration |
    SetToggleImmersiveAudioHandler |
    SetImmersiveAudioReady |
    SetImmersiveAudioUnavailable |
    ToggleImmersiveAudio

enum PerformerStateKeys {
    TIME = 'time',
    TOTAL_DURATION = 'totalDuration',
    PAUSED = 'paused',
    TOGGLE_IMMERSIVE_AUDIO_HANDLER = 'toggleImmersiveAudioHandler',
    IMMERSIVE_AUDIO_READY = 'immersiveAudioReady',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'immersiveAudioUnavailable',
    IMMERSIVE_AUDIO = 'immersiveAudio',
}

interface PerformerState {
    [ PerformerStateKeys.TIME ]: Time,
    [ PerformerStateKeys.TOTAL_DURATION ]: Time,
    [ PerformerStateKeys.PAUSED ]: boolean,
    [ PerformerStateKeys.TOGGLE_IMMERSIVE_AUDIO_HANDLER ]: VoidFunction,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_READY ]: boolean,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ PerformerStateKeys.IMMERSIVE_AUDIO ]: boolean,
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
