import { Ms, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME_POSITION = 'SET_TIME_POSITION',
    SET_PATTERN_DURATION = 'SET_PATTERN_DURATION',
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

interface SetTimePosition {
    data: Ms,
    type: PerformerStateActionType.SET_TIME_POSITION,
}

interface SetTotalDuration {
    data: Ms,
    type: PerformerStateActionType.SET_PATTERN_DURATION,
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
    SetTimePosition |
    SetTotalDuration |
    SetToggleImmersiveAudioHandler |
    SetImmersiveAudioReady |
    SetImmersiveAudioUnavailable |
    ToggleImmersiveAudio

enum PerformerStateKeys {
    TIME_POSITION = 'timePosition',
    PATTERN_DURATION = 'patternDuration',
    PAUSED = 'paused',
    TOGGLE_IMMERSIVE_AUDIO_HANDLER = 'toggleImmersiveAudioHandler',
    IMMERSIVE_AUDIO_READY = 'immersiveAudioReady',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'immersiveAudioUnavailable',
    IMMERSIVE_AUDIO = 'immersiveAudio',
}

interface PerformerState {
    [ PerformerStateKeys.TIME_POSITION ]: Ms,
    [ PerformerStateKeys.PATTERN_DURATION ]: Ms,
    [ PerformerStateKeys.PAUSED ]: boolean,
    [ PerformerStateKeys.TOGGLE_IMMERSIVE_AUDIO_HANDLER ]: VoidFunction,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_READY ]: boolean,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ PerformerStateKeys.IMMERSIVE_AUDIO ]: boolean,
}

type ImmutablePerformerState = TypedMap<PerformerState>

export {
    ImmutablePerformerState,
    PerformerStateAction,
    PerformerStateActionType,
    PerformerStateKeys,
}
