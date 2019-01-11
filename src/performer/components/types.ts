import { Time } from '@musical-patterns/utilities'
import * as React from 'react'

interface TimeControlsPropsFromParent {
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
    timeChangeHandler: (event: React.SyntheticEvent) => Promise<void>,
    togglePausedHandler: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch, TimeControlsPropsFromParent {}

interface EnterImmersiveAudioButtonPropsFromParent {
    disabled: boolean,
}

interface EnterImmersiveAudioButtonPropsFromState {
    enterImmersiveAudioHandler: VoidFunction,
}

interface EnterImmersiveAudioButtonProps extends EnterImmersiveAudioButtonPropsFromParent,
    EnterImmersiveAudioButtonPropsFromState {}

interface TimeInMinutesAndSecondsProps {
    disabled: boolean,
    timeForDisplay: number,
}

interface PerformerProps {
    disabled: boolean,
}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    EnterImmersiveAudioButtonPropsFromState,
    EnterImmersiveAudioButtonProps,
    TimeInMinutesAndSecondsProps,
    PerformerProps,
}
