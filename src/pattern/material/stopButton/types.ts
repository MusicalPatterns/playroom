import { PerformerDisabledParameter } from '../types'

interface StopButtonPropsFromDispatch {
    handleStopClickEvent: VoidFunction,
}

interface StopButtonProps extends PerformerDisabledParameter, StopButtonPropsFromDispatch {}

export {
    StopButtonPropsFromDispatch,
    StopButtonProps,
}
