import { DispatchParameter } from '../../../types'

interface HamburgerPropsFromState {
    leftColumnOpen: boolean,
}

interface HamburgerPropsFromDispatch {
    handleHamburgerClickEvent: (parameters: HamburgerPropsFromState) => void,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromState {}

interface HandleHamburgerClickParameters extends DispatchParameter, HamburgerPropsFromState {}

export {
    HamburgerProps,
    HamburgerPropsFromDispatch,
    HamburgerPropsFromState,
    HandleHamburgerClickParameters,
}
