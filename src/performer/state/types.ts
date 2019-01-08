import { Time, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME = 'SET_TIME',
    SET_TOTAL_DURATION = 'SET_TOTAL_DURATION',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
    SET_PAUSED = 'SET_PAUSED',
    SET_ENTER_IMMERSIVE_AUDIO_HANDLER = 'SET_ENTER_IMMERSIVE_AUDIO_HANDLER',
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

interface SetEnterImmersiveAudioHandler {
    data: VoidFunction,
    type: PerformerStateActionType.SET_ENTER_IMMERSIVE_AUDIO_HANDLER,
}

type PerformerStateAction =
    TogglePaused |
    SetPaused |
    SetTime |
    SetTotalDuration |
    SetEnterImmersiveAudioHandler

enum PerformerStateKeys {
    TIME = 'time',
    TOTAL_DURATION = 'totalDuration',
    PAUSED = 'paused',
    ENTER_IMMERSIVE_AUDIO_HANDLER = 'enterImmersiveAudioHandler',
}

interface PerformerState {
    [ PerformerStateKeys.TIME ]: Time,
    [ PerformerStateKeys.TOTAL_DURATION ]: Time,
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
