import { Time } from '@musical-patterns/utilities'

interface MaybeDisabled {
    disabled: boolean,
}

interface TimeControlsContainerPropsFromState {
    time: Time,
    totalDuration: Time,
}

interface TimeControlsContainerProps extends TimeControlsContainerPropsFromState, MaybeDisabled {}

interface TimeControlsPropsFromState {
    paused: boolean,
}

interface TimeControlsPropsFromDispatch {
    rewindHandler: VoidFunction,
    stopHandler: VoidFunction,
    togglePausedHandler: VoidFunction,
}

interface TimeControlsPropsFromParent extends MaybeDisabled {
    timeForDisplay: Time,
    totalTimeForDisplay: Time,
}

interface TimeControlsProps extends TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromParent {}

interface ToggleImmersiveAudioButtonPropsFromState {
    immersiveAudio: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnvailable: boolean,
    toggleImmersiveAudioHandler: VoidFunction,
}

interface ToggleImmersiveAudioButtonProps extends MaybeDisabled,
    ToggleImmersiveAudioButtonPropsFromState {}

interface TimeInMinutesAndSecondsProps extends MaybeDisabled {
    timeForDisplay: Time,
}

export {
    TimeControlsContainerPropsFromState,
    TimeControlsPropsFromParent,
    TimeControlsContainerProps,
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonProps,
    TimeInMinutesAndSecondsProps,
    MaybeDisabled,
}
