import { Time } from '@musical-patterns/utilities'
import * as React from 'react'

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

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

interface EnterImmersiveAudioButtonProps {
    enterImmersiveAudioHandler: VoidFunction,
}

interface TimeInMinutesAndSecondsProps {
    timeForDisplay: number,
}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    EnterImmersiveAudioButtonProps,
    TimeInMinutesAndSecondsProps,
}
