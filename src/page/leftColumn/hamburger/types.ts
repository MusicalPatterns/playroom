import { DispatchParameter } from '../../../types'

interface HamburgerPropsFromState {
    leftColumnOpen: boolean,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (leftColumnOpen: boolean) => void,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromState {}

interface HandleHamburgerParameters extends DispatchParameter {
    leftColumnOpen: boolean,
}

export {
    HamburgerProps,
    HamburgerPropsFromDispatch,
    HamburgerPropsFromState,
    HandleHamburgerParameters,
}
