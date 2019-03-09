import { PerformerDisabledParameter } from '../types'

interface PauseButtonPropsFromDispatch {
    handlePauseClickEvent: VoidFunction,
}

interface PauseButtonProps extends PerformerDisabledParameter, PauseButtonPropsFromDispatch {}

export {
    PauseButtonPropsFromDispatch,
    PauseButtonProps,
}
