import { Attributes, DomSpec, ValidationFunction, ValidationResults, Value } from '@musical-patterns/pattern'
import { DispatchAsProp, EventAsProp } from '../../types'
import { ImmutableSpecState } from '../types'

interface AddOrRemoveButtonPropsFromParent {
    property: string,
}

interface AddOrRemoveButtonPropsFromState {
    specState: ImmutableSpecState,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromState,
    AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp,
    AddOrRemoveButtonPropsFromParent, AddOrRemoveButtonPropsFromState {}

interface HandleArrayedSpecControlAddOrRemoveParameters extends EventAsProp,
    DispatchAsProp, AddOrRemoveButtonPropsFromParent, AddOrRemoveButtonPropsFromState {}

interface BuildAttemptSubmitActionsParameters {
    property: string,
    specState: ImmutableSpecState,
    suppressReevaluatingValidationResults?: boolean,
    updatedValue: Value,
}

interface ValidateSubmittedSpecParameters {
    attributes: Attributes,
    property: string,
    updatedDisplayedSpec: DomSpec,
    validationFunction?: ValidationFunction,
}

interface UpdatedValidationResultsPlusIsValid {
    isValid: boolean,
    updatedValidationResults: ValidationResults,
}

export {
    AddOrRemoveButtonPropsFromState,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonPropsFromParent,
    AddOrRemoveButtonProps,
    HandleAddOrRemoveParameters,
    HandleArrayedSpecControlAddOrRemoveParameters,
    BuildAttemptSubmitActionsParameters,
    UpdatedValidationResultsPlusIsValid,
    ValidateSubmittedSpecParameters,
}
