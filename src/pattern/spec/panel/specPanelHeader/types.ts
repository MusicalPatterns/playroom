import { DispatchParameter } from '../../../../types'
import { SpecPanelOpenParameter } from '../types'

interface SpecPanelHeaderPropsFromDispatch {
    handleSpecPanelHeaderClickEvent: HandleSpecPanelHeaderClickEvent,
}

interface SpecPanelHeaderProps extends SpecPanelOpenParameter, SpecPanelHeaderPropsFromDispatch {}

interface HandleSpecPanelHeaderClickParameters extends DispatchParameter, SpecPanelOpenParameter {}

type HandleSpecPanelHeaderClickEvent = (parameters: SpecPanelOpenParameter) => void

export {
    SpecPanelHeaderPropsFromDispatch,
    SpecPanelHeaderProps,
    HandleSpecPanelHeaderClickParameters,
    HandleSpecPanelHeaderClickEvent,
}
