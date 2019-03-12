import { ComputeValidations, DomSpecs, DomSpecValue, Specs, SpecValue, Validations } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { ControlParentProps } from '../control'
import { ConfigurationsParameter } from '../types'

interface SubmissionProps extends ConfigurationsParameter {
    computeValidations: Maybe<ComputeValidations>,
    displayedSpecs: DomSpecs,
    submittedSpecs: Specs,
}

interface ComputeAttemptSubmitActionsParameters extends SubmissionProps, ControlParentProps {
    suppressReevaluatingValidations?: boolean,
    updatedValue: DomSpecValue,
}

interface ValidateSubmittedSpecsParameters extends ConfigurationsParameter, ControlParentProps {
    computeValidations: Maybe<ComputeValidations>,
    updatedDisplayedSpecs: DomSpecs,
}

interface UpdatedValidationsPlusIsValid {
    isValid: boolean,
    updatedValidations: Validations,
}

export {
    SubmissionProps,
    ComputeAttemptSubmitActionsParameters,
    UpdatedValidationsPlusIsValid,
    ValidateSubmittedSpecsParameters,
}
