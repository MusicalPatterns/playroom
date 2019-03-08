import { DispatchAsProp } from '../../../types'

interface HamburgerPropsFromState {
    leftColumnOpen: boolean,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (leftColumnOpen: boolean) => void,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromState {}

interface HandleHamburgerParameters extends DispatchAsProp {
    leftColumnOpen: boolean,
}

export {
    HamburgerProps,
    HamburgerPropsFromDispatch,
    HamburgerPropsFromState,
    HandleHamburgerParameters,
}
