import { Specs } from '@musical-patterns/pattern'
import { DispatchParameter } from '../../../../types'

interface ResetSpecsButtonPropsFromState {
    initialSpecs: Specs,
    restartOnModify: boolean,
    submittedSpecs: Specs,
}

interface ResetSpecsButtonPropsFromDispatch {
    handleSpecsResetEvent: (parameters: HandleSpecsResetEventParameters) => void,
}

interface ResetSpecsButtonProps extends ResetSpecsButtonPropsFromState, ResetSpecsButtonPropsFromDispatch {}

interface HandleSpecsResetParameters extends DispatchParameter, HandleSpecsResetEventParameters {}

interface HandleSpecsResetEventParameters {
    restartOnModify: boolean,
    specs: Specs,
}

export {
    ResetSpecsButtonPropsFromState,
    ResetSpecsButtonPropsFromDispatch,
    ResetSpecsButtonProps,
    HandleSpecsResetParameters,
    HandleSpecsResetEventParameters,
}
