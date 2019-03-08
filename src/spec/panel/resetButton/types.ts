import { Spec } from '@musical-patterns/pattern'
import { DispatchParameter } from '../../../types'

interface ResetButtonPropsFromState {
    initialSpec: Spec,
    submittedSpec: Spec,
}

interface ResetButtonPropsFromDispatch {
    resetHandler: (spec: Spec) => void,
}

interface ResetButtonProps extends ResetButtonPropsFromState, ResetButtonPropsFromDispatch {}

interface HandleResetParameters extends DispatchParameter {
    spec: Spec,
}

export {
    ResetButtonPropsFromState,
    ResetButtonPropsFromDispatch,
    ResetButtonProps,
    HandleResetParameters,
}
