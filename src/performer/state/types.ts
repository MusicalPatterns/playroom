import { Time, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateActionType {
    SET_TIME = 'SET_TIME',
    TOGGLE_PAUSED = 'TOGGLE_PAUSED',
}

interface SetPaused {
    type: PerformerStateActionType.TOGGLE_PAUSED,
}

interface SetTime {
    data: Time,
    type: PerformerStateActionType.SET_TIME,
}

type PerformerStateAction =
    SetPaused |
    SetTime

enum PerformerStateKeys {
    TIME = 'time',
    PAUSED = 'paused',
}

interface PerformerState {
    [ PerformerStateKeys.TIME ]: Time,
    [ PerformerStateKeys.PAUSED ]: boolean,
}

type PerformerStateValueTypes =
    Time |
    boolean

type ImmutablePerformerState = TypedMap<PerformerStateValueTypes, PerformerState>

export {
    ImmutablePerformerState,
    PerformerStateAction,
    PerformerStateActionType,
    PerformerStateKeys,
}
