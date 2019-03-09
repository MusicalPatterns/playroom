import { ValidationResults } from '@musical-patterns/pattern'
import { DispatchParameter, EventParameter } from '../../../types'
import { PropertyParameter } from '../../types'
import { AddFieldButtonPropsFromState } from '../addFieldButton'

interface RemoveFieldButtonPropsFromState extends AddFieldButtonPropsFromState {
    validationResults: ValidationResults,
}

interface RemoveFieldButtonPropsFromDispatch {
    handleFieldRemoveEvent: (parameters: HandleFieldRemoveEventParameters) => void,
}

interface RemoveFieldButtonProps extends RemoveFieldButtonPropsFromState,
    RemoveFieldButtonPropsFromDispatch, PropertyParameter {}

interface HandleFieldRemoveEventParameters extends EventParameter, PropertyParameter, RemoveFieldButtonPropsFromState {}

interface HandleFieldRemoveParameters extends PropertyParameter, RemoveFieldButtonPropsFromState, DispatchParameter {}

export {
    RemoveFieldButtonPropsFromState,
    RemoveFieldButtonPropsFromDispatch,
    RemoveFieldButtonProps,
    HandleFieldRemoveEventParameters,
    HandleFieldRemoveParameters,
}
