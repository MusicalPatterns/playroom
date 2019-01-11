import { Time } from '@musical-patterns/utilities'
import * as React from 'react'

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
    toggleImmersiveAudioHandler: VoidFunction,
}

interface ToggleImmersiveAudioButtonProps extends MaybeDisabled,
    ToggleImmersiveAudioButtonPropsFromState {}

interface TimeInMinutesAndSecondsProps extends MaybeDisabled {
    timeForDisplay: number,
}

interface TimelinePropsFromParent extends MaybeDisabled {
    timeForDisplay: number,
    totalTimeForDisplay: number,
}

interface TimelinePropsFromDispatch {
    timeChangeHandler: (event: React.SyntheticEvent) => Promise<void>,
}

interface TimelineProps extends TimelinePropsFromParent, TimelinePropsFromDispatch {}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonProps,
    TimeInMinutesAndSecondsProps,
    MaybeDisabled,
    TimelinePropsFromDispatch,
    TimelineProps,
}
