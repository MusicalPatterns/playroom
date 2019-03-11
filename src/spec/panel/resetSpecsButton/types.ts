import { Specs } from '@musical-patterns/pattern'
import { DispatchParameter } from '../../../types'

interface ResetSpecsButtonPropsFromState {
    initialSpecs: Specs,
    submittedSpecs: Specs,
}

interface ResetSpecsButtonPropsFromDispatch {
    handleSpecsResetEvent: (specs: Specs) => void,
}

interface ResetSpecsButtonProps extends ResetSpecsButtonPropsFromState, ResetSpecsButtonPropsFromDispatch {}

interface HandleSpecsResetParameters extends DispatchParameter {
    specs: Specs,
}

export {
    ResetSpecsButtonPropsFromState,
    ResetSpecsButtonPropsFromDispatch,
    ResetSpecsButtonProps,
    HandleSpecsResetParameters,
}
