import { ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { Ms, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME_POSITION = 'SET_TIME_POSITION',
    SET_PATTERN_DURATION = 'SET_PATTERN_DURATION',
    SET_PAUSED = 'SET_PAUSED',
    SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS = 'SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS',
    SET_IMMERSIVE_AUDIO_READY = 'SET_IMMERSIVE_AUDIO_READY',
    SET_IMMERSIVE_AUDIO_UNAVAILABLE = 'SET_IMMERSIVE_AUDIO_UNAVAILABLE',
    SET_IMMERSIVE_AUDIO_ENABLED = 'SET_IMMERSIVE_AUDIO_ENABLED',
    SET_PERFORMER_DISABLED = 'SET_PERFORMER_DISABLED',
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

interface SetToggleImmersiveAudioHandlers {
    data: ToggleImmersiveAudioHandlers,
    type: PerformerStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS,
}

interface SetImmersiveAudioReady {
    data: boolean,
    type: PerformerStateActionType.SET_IMMERSIVE_AUDIO_READY,
}

interface SetImmersiveAudioUnavailable {
    data: boolean,
    type: PerformerStateActionType.SET_IMMERSIVE_AUDIO_UNAVAILABLE,
}

interface SetImmersiveAudioEnabled {
    data: boolean,
    type: PerformerStateActionType.SET_IMMERSIVE_AUDIO_ENABLED,
}

interface SetPerformerDisabled {
    data: boolean,
    type: PerformerStateActionType.SET_PERFORMER_DISABLED,
}

type PerformerStateAction =
    SetPaused |
    SetTimePosition |
    SetTotalDuration |
    SetToggleImmersiveAudioHandlers |
    SetImmersiveAudioReady |
    SetImmersiveAudioUnavailable |
    SetImmersiveAudioEnabled |
    SetPerformerDisabled

enum PerformerStateKey {
    TIME_POSITION = 'timePosition',
    PATTERN_DURATION = 'patternDuration',
    PAUSED = 'paused',
    TOGGLE_IMMERSIVE_AUDIO_HANDLERS = 'toggleImmersiveAudioHandlers',
    IMMERSIVE_AUDIO_READY = 'immersiveAudioReady',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'immersiveAudioUnavailable',
    IMMERSIVE_AUDIO_ENABLED = 'immersiveAudioEnabled',
    PERFORMER_DISABLED = 'performerDisabled',
}

interface PerformerState {
    [ PerformerStateKey.TIME_POSITION ]: Ms,
    [ PerformerStateKey.PATTERN_DURATION ]: Ms,
    [ PerformerStateKey.PAUSED ]: boolean,
    [ PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: ToggleImmersiveAudioHandlers,
    [ PerformerStateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ PerformerStateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
    [ PerformerStateKey.PERFORMER_DISABLED ]: boolean,
}

type ImmutablePerformerState = TypedMap<PerformerState>

type PerformerStateActionMap = { [key in keyof typeof PerformerStateActionType]: PerformerStateKey }

export {
    ImmutablePerformerState,
    PerformerStateAction,
    PerformerStateActionType,
    PerformerStateKey,
    PerformerStateActionMap,
}
