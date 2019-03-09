import { PerformerDisabledParameter } from '../types'

interface PlayButtonPropsFromDispatch {
    handlePlayClickEvent: VoidFunction,
}

interface PlayButtonProps extends PerformerDisabledParameter, PlayButtonPropsFromDispatch {}

export {
    PlayButtonPropsFromDispatch,
    PlayButtonProps,
}
