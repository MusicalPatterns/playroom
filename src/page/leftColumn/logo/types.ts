import { DispatchParameter, EventParameter } from '../../../types'

interface LogoPropsFromState {
    rightColumnOpen: boolean,
}

interface LogoPropsFromDispatch {
    handleLogoClickEvent: HandleLogoClickEvent,
}

interface LogoProps extends LogoPropsFromState, LogoPropsFromDispatch {}

interface HandleLogoClickEventParameters extends EventParameter, LogoPropsFromState {}

type HandleLogoClickEvent = (parameters: HandleLogoClickEventParameters) => void

interface HandleLogoClickParameters extends DispatchParameter, HandleLogoClickEventParameters {}

type HandleLogoClick = (parameters: HandleLogoClickParameters) => Promise<void>

export {
    LogoPropsFromState,
    LogoPropsFromDispatch,
    LogoProps,
    HandleLogoClickEventParameters,
    HandleLogoClickParameters,
    HandleLogoClick,
    HandleLogoClickEvent,
}
