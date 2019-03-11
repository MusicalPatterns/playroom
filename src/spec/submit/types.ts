import { DomSpec, Spec, ValidationFunction, ValidationResults, Value } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { ControlParentProps } from '../control'
import { AttributesParameter } from '../types'

interface SubmissionProps extends AttributesParameter {
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationFunction: Maybe<ValidationFunction>,
}

interface ComputeAttemptSubmitActionsParameters extends SubmissionProps, ControlParentProps {
    suppressReevaluatingValidationResults?: boolean,
    updatedValue: Value,
}

interface ValidateSubmittedSpecParameters extends AttributesParameter, ControlParentProps {
    updatedDisplayedSpec: DomSpec,
    validationFunction: Maybe<ValidationFunction>,
}

interface UpdatedValidationResultsPlusIsValid {
    isValid: boolean,
    updatedValidationResults: ValidationResults,
}

export {
    SubmissionProps,
    ComputeAttemptSubmitActionsParameters,
    UpdatedValidationResultsPlusIsValid,
    ValidateSubmittedSpecParameters,
}
