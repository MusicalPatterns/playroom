import { DispatchParameter, EventParameter } from '../../../types'

interface TitlePropsFromState {
    rightColumnOpen: boolean,
}

interface TitlePropsFromDispatch {
    handleTitleClickEvent: TitleClickEventExtractor,
}

interface TitleProps extends TitlePropsFromState, TitlePropsFromDispatch {}

interface TitleClickEventParameters extends EventParameter {
    rightColumnOpen: boolean,
}

type TitleClickEventExtractor = (parameters: TitleClickEventParameters) => void

interface TitleClickEventHandlerParameters extends DispatchParameter {
    titleClickEventParameters: TitleClickEventParameters,
}

type TitleClickEventHandler = (parameters: TitleClickEventHandlerParameters) => Promise<void>

export {
    TitlePropsFromState,
    TitlePropsFromDispatch,
    TitleProps,
    TitleClickEventParameters,
    TitleClickEventHandlerParameters,
    TitleClickEventHandler,
    TitleClickEventExtractor,
}
