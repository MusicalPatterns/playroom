import { DispatchParameter, EventParameter } from '../../../types'
import { SpecPanelOpenParameter } from '../types'

interface SpecPanelHeaderPropsFromDispatch {
    handleSpecPanelCaretClickEvent: SpecPanelCaretClickEventExtractor,
}

interface SpecPanelHeaderProps extends SpecPanelOpenParameter, SpecPanelHeaderPropsFromDispatch {}

interface SpecPanelCaretClickHandlerParameters extends DispatchParameter, SpecPanelOpenParameter {}

interface SpecPanelCaretClickEventParameters extends EventParameter, SpecPanelOpenParameter {}

type SpecPanelCaretClickEventExtractor = (parameters: SpecPanelCaretClickEventParameters) => void

export {
    SpecPanelHeaderPropsFromDispatch,
    SpecPanelHeaderProps,
    SpecPanelCaretClickHandlerParameters,
    SpecPanelCaretClickEventParameters,
    SpecPanelCaretClickEventExtractor,
}
