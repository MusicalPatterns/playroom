import { Time } from '@musical-patterns/utilities'

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

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

interface EnterImmersiveAudioButtonProps {
    enterImmersiveAudioHandler: VoidFunction,
}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    EnterImmersiveAudioButtonProps,
}
