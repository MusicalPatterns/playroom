import { Ms } from '@musical-patterns/utilities'

interface TimeControlsPropsFromState {
    disabled: boolean,
    patternDuration: Ms,
    paused: boolean,
    timePosition: Ms,
}

interface TimeControlsPropsFromDispatch {
    pauseHandler: VoidFunction,
    playHandler: VoidFunction,
    rewindHandler: VoidFunction,
    stopHandler: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

export {
    TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch,
    TimeControlsProps,
}
