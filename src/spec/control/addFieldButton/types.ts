import { Attributes, DomSpec, Spec, ValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { DispatchParameter, EventParameter } from '../../../types'
import { PropertyParameter } from '../../types'

interface AddFieldButtonPropsFromState {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationFunction: Maybe<ValidationFunction>,
}

interface AddFieldButtonPropsFromDispatch {
    handleFieldAddEvent: (parameters: HandleFieldAddEventParameters) => void,
}

interface AddFieldButtonProps extends AddFieldButtonPropsFromState,
    AddFieldButtonPropsFromDispatch, PropertyParameter {}

interface HandleFieldAddEventParameters extends EventParameter, PropertyParameter, AddFieldButtonPropsFromState {}

interface HandleFieldAddParameters extends PropertyParameter, AddFieldButtonPropsFromState, DispatchParameter {}

export {
    AddFieldButtonPropsFromState,
    AddFieldButtonPropsFromDispatch,
    AddFieldButtonProps,
    HandleFieldAddEventParameters,
    HandleFieldAddParameters,
}
