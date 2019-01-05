import { Time } from '@musical-patterns/utilities'

interface TimeControlsPropsFromState {
    paused: boolean,
    time: Time,
}

interface TimeControlsPropsFromDispatch {
    onClick: () => void,
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
