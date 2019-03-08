import { Spec } from '@musical-patterns/pattern'
import { DispatchAsProp } from '../../types'

interface ResetPropsFromState {
    initialSpec: Spec,
    submittedSpec: Spec,
}

interface ResetPropsFromDispatch {
    resetHandler: (spec: Spec) => void,
}

interface ResetProps extends ResetPropsFromState, ResetPropsFromDispatch {}

interface HandleResetParameters extends DispatchAsProp {
    spec: Spec,
}

export {
    ResetPropsFromState,
    ResetPropsFromDispatch,
    ResetProps,
    HandleResetParameters,
}
