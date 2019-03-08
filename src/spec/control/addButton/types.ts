import { Attributes, DomSpec, Spec, ValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { DispatchParameter, EventParameter } from '../../../types'
import { PropertyParameter } from '../types'

interface AddButtonPropsFromState {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationFunction: Maybe<ValidationFunction>,
}

interface AddButtonPropsFromDispatch {
    handleAddEvent: (parameters: HandleAddEventParameters) => void,
}

interface AddButtonProps extends AddButtonPropsFromState, AddButtonPropsFromDispatch, PropertyParameter {}

interface HandleAddEventParameters extends EventParameter, PropertyParameter, AddButtonPropsFromState {}

interface HandleAddParameters extends PropertyParameter, AddButtonPropsFromState, DispatchParameter{}

export {
    AddButtonPropsFromState,
    AddButtonPropsFromDispatch,
    AddButtonProps,
    HandleAddEventParameters,
    HandleAddParameters,
}
