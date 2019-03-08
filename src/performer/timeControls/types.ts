import { Ms } from '@musical-patterns/utilities'

interface TimeControlsPropsFromState {
    disabled: boolean,
    patternDuration: Ms,
    paused: boolean,
    timePosition: Ms,
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
