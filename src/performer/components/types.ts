import { Ms } from '@musical-patterns/utilities'

interface MaybeDisabled {
    disabled: boolean,
}

interface TimeControlsContainerPropsFromState {
    patternDuration: Ms,
    timePosition: Ms,
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
    patternDurationForDisplay: Ms,
    timePositionForDisplay: Ms,
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
    timePositionForDisplay: Ms,
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
