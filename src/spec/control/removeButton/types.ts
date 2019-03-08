import { ValidationResults } from '@musical-patterns/pattern'
import { DispatchParameter, EventParameter } from '../../../types'
import { AddButtonPropsFromState } from '../addButton'
import { PropertyParameter } from '../types'

interface RemoveButtonPropsFromState extends AddButtonPropsFromState {
    validationResults: ValidationResults,
}

interface RemoveButtonPropsFromDispatch {
    handleRemoveEvent: (parameters: HandleRemoveEventParameters) => void,
}

interface RemoveButtonProps extends RemoveButtonPropsFromState, RemoveButtonPropsFromDispatch, PropertyParameter {}

interface HandleRemoveEventParameters extends EventParameter, PropertyParameter, RemoveButtonPropsFromState {}

interface HandleRemoveParameters extends PropertyParameter, RemoveButtonPropsFromState, DispatchParameter {}

export {
    RemoveButtonPropsFromState,
    RemoveButtonPropsFromDispatch,
    RemoveButtonProps,
    HandleRemoveEventParameters,
    HandleRemoveParameters,
}
