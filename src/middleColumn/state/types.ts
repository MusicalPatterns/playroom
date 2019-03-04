import { ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { Ms, TypedMap } from '@musical-patterns/utilities'

enum MiddleColumnStateActionType {
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
    type: MiddleColumnStateActionType.SET_PAUSED,
}

interface SetTimePosition {
    data: Ms,
    type: MiddleColumnStateActionType.SET_TIME_POSITION,
}

interface SetTotalDuration {
    data: Ms,
    type: MiddleColumnStateActionType.SET_PATTERN_DURATION,
}

interface SetToggleImmersiveAudioHandlers {
    data: ToggleImmersiveAudioHandlers,
    type: MiddleColumnStateActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS,
}

interface SetImmersiveAudioReady {
    data: boolean,
    type: MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_READY,
}

interface SetImmersiveAudioUnavailable {
    data: boolean,
    type: MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_UNAVAILABLE,
}

interface SetImmersiveAudioEnabled {
    data: boolean,
    type: MiddleColumnStateActionType.SET_IMMERSIVE_AUDIO_ENABLED,
}

interface SetPerformerDisabled {
    data: boolean,
    type: MiddleColumnStateActionType.SET_PERFORMER_DISABLED,
}

type MiddleColumnStateAction =
    SetPaused |
    SetTimePosition |
    SetTotalDuration |
    SetToggleImmersiveAudioHandlers |
    SetImmersiveAudioReady |
    SetImmersiveAudioUnavailable |
    SetImmersiveAudioEnabled |
    SetPerformerDisabled

enum MiddleColumnStateKey {
    TIME_POSITION = 'timePosition',
    PATTERN_DURATION = 'patternDuration',
    PAUSED = 'paused',
    TOGGLE_IMMERSIVE_AUDIO_HANDLERS = 'toggleImmersiveAudioHandlers',
    IMMERSIVE_AUDIO_READY = 'immersiveAudioReady',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'immersiveAudioUnavailable',
    IMMERSIVE_AUDIO_ENABLED = 'immersiveAudioEnabled',
    PERFORMER_DISABLED = 'performerDisabled',
}

interface MiddleColumnState {
    [ MiddleColumnStateKey.TIME_POSITION ]: Ms,
    [ MiddleColumnStateKey.PATTERN_DURATION ]: Ms,
    [ MiddleColumnStateKey.PAUSED ]: boolean,
    [ MiddleColumnStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: ToggleImmersiveAudioHandlers,
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
    [ MiddleColumnStateKey.PERFORMER_DISABLED ]: boolean,
}

type ImmutableMiddleColumnState = TypedMap<MiddleColumnState>

type MiddleColumnStateActionMap = { [key in keyof typeof MiddleColumnStateActionType]: MiddleColumnStateKey }

export {
    ImmutableMiddleColumnState,
    MiddleColumnStateAction,
    MiddleColumnStateActionType,
    MiddleColumnStateKey,
    MiddleColumnStateActionMap,
}
