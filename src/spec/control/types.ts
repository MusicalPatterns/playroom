import { Attributes, DomSpec, Spec, ValidationFunction, ValidationResults, Value } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

interface BuildAttemptSubmitActionsParameters extends PropertyParameter {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    suppressReevaluatingValidationResults?: boolean,
    updatedValue: Value,
    validationFunction: Maybe<ValidationFunction>,
}

interface ValidateSubmittedSpecParameters extends PropertyParameter {
    attributes: Attributes,
    updatedDisplayedSpec: DomSpec,
    validationFunction?: ValidationFunction,
}

interface UpdatedValidationResultsPlusIsValid {
    isValid: boolean,
    updatedValidationResults: ValidationResults,
}

interface PropertyParameter {
    property: string,
}

export {
    BuildAttemptSubmitActionsParameters,
    UpdatedValidationResultsPlusIsValid,
    ValidateSubmittedSpecParameters,
    PropertyParameter,
}
