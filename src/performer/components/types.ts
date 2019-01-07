import { Time } from '@musical-patterns/utilities'

interface TimeControlsPropsFromState {
    paused: boolean,
    time: Time,
}

interface TimeControlsPropsFromDispatch {
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
