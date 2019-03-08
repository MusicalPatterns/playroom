import { Spec } from '@musical-patterns/pattern'
import { DispatchParameter } from '../../../types'

interface ResetSpecButtonPropsFromState {
    initialSpec: Spec,
    submittedSpec: Spec,
}

interface ResetSpecButtonPropsFromDispatch {
    handleSpecResetEvent: (spec: Spec) => void,
}

interface ResetSpecButtonProps extends ResetSpecButtonPropsFromState, ResetSpecButtonPropsFromDispatch {}

interface HandleSpecResetParameters extends DispatchParameter {
    spec: Spec,
}

export {
    ResetSpecButtonPropsFromState,
    ResetSpecButtonPropsFromDispatch,
    ResetSpecButtonProps,
    HandleSpecResetParameters,
}
