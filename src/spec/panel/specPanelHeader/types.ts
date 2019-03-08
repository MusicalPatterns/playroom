import { DispatchAsProp, EventAsProp } from '../../../types'
import { SpecPanelOpenAsProp } from '../types'

interface SpecPanelHeaderPropsFromDispatch {
    handleSpecPanelCaretClickEvent: SpecPanelCaretClickEventExtractor,
}

interface SpecPanelHeaderProps extends SpecPanelOpenAsProp, SpecPanelHeaderPropsFromDispatch {}

interface SpecPanelCaretClickHandlerParameters extends DispatchAsProp, SpecPanelOpenAsProp {}

interface SpecPanelCaretClickEventParameters extends EventAsProp, SpecPanelOpenAsProp {}

type SpecPanelCaretClickEventExtractor = (parameters: SpecPanelCaretClickEventParameters) => void

export {
    SpecPanelHeaderPropsFromDispatch,
    SpecPanelHeaderProps,
    SpecPanelCaretClickHandlerParameters,
    SpecPanelCaretClickEventParameters,
    SpecPanelCaretClickEventExtractor,
}
