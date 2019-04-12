import { ArrayedDomSpecValue, Configurations, Validations } from '@musical-patterns/spec'
import { DispatchParameter, EventParameter } from '../../../../types'
import { SubmissionProps } from '../../types'
import { ControlParentProps } from '../types'

interface RemoveFieldButtonPropsFromState extends SubmissionProps {
    validations: Validations,
}

interface RemoveFieldButtonPropsFromDispatch {
    handleFieldRemoveEvent: (parameters: HandleFieldRemoveEventParameters) => void,
}

interface RemoveFieldButtonProps extends RemoveFieldButtonPropsFromState,
    RemoveFieldButtonPropsFromDispatch, ControlParentProps {}

interface HandleFieldRemoveEventParameters extends EventParameter,
    ControlParentProps, RemoveFieldButtonPropsFromState {}

interface HandleFieldRemoveParameters extends ControlParentProps, RemoveFieldButtonPropsFromState, DispatchParameter {}

interface ComputeRemoveFieldButtonAttributesParameters {
    configurations: Configurations,
    displayedValue: ArrayedDomSpecValue,
    specKey: string
}

export {
    RemoveFieldButtonPropsFromState,
    RemoveFieldButtonPropsFromDispatch,
    RemoveFieldButtonProps,
    HandleFieldRemoveEventParameters,
    HandleFieldRemoveParameters,
    ComputeRemoveFieldButtonAttributesParameters,
}
