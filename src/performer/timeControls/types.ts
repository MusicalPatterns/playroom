import { Ms } from '@musical-patterns/utilities'

interface TimeControlsPropsFromState {
    disabled: boolean,
    paused: boolean,
}

interface TimeControlsPropsFromDispatch {
    handlePauseClickEvent: VoidFunction,
    handlePlayClickEvent: VoidFunction,
    handleRewindClickEvent: VoidFunction,
    handleStopClickEvent: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

export {
    TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch,
    TimeControlsProps,
}
