import { DispatchAsProp, EventAsProp } from '../../../types'
import { SpecPanelOpenAsProp } from '../types'

interface SpecPanelHeaderPropsFromDispatch {
    handleCaretClickEvent: CaretClickEventExtractor,
}

interface SpecPanelHeaderProps extends SpecPanelOpenAsProp, SpecPanelHeaderPropsFromDispatch {}

interface CaretClickHandlerParameters extends DispatchAsProp, SpecPanelOpenAsProp {}

interface CaretClickEventParameters extends EventAsProp, SpecPanelOpenAsProp {}

type CaretClickEventExtractor = (parameters: CaretClickEventParameters) => void

export {
    SpecPanelHeaderPropsFromDispatch,
    SpecPanelHeaderProps,
    CaretClickHandlerParameters,
    CaretClickEventParameters,
    CaretClickEventExtractor,
}
