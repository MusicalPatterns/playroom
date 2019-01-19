import { Time } from '@musical-patterns/utilities'

interface MaybeDisabled {
    disabled: boolean,
}

interface TimeControlsPropsFromState {
    paused: boolean,
    time: Time,
    totalDuration: Time,
}

interface TimeControlsPropsFromDispatch {
    rewindHandler: VoidFunction,
    stopHandler: VoidFunction,
    togglePausedHandler: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch, MaybeDisabled {}

interface ToggleImmersiveAudioButtonPropsFromState {
    immersiveAudio: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnvailable: boolean,
    toggleImmersiveAudioHandler: VoidFunction,
}

interface ToggleImmersiveAudioButtonProps extends MaybeDisabled,
    ToggleImmersiveAudioButtonPropsFromState {}

interface TimeInMinutesAndSecondsProps extends MaybeDisabled {
    timeForDisplay: number,
}

interface TimelineProps extends MaybeDisabled {
    timeForDisplay: number,
    totalTimeForDisplay: number,
}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonProps,
    TimeInMinutesAndSecondsProps,
    MaybeDisabled,
    TimelineProps,
}
