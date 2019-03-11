import { Validations } from '@musical-patterns/pattern'
import { DispatchParameter, EventParameter } from '../../../types'
import { SubmissionProps } from '../../submit'
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

export {
    RemoveFieldButtonPropsFromState,
    RemoveFieldButtonPropsFromDispatch,
    RemoveFieldButtonProps,
    HandleFieldRemoveEventParameters,
    HandleFieldRemoveParameters,
}
