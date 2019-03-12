import { DomSpecValue, Specs, Validation, Validations } from '@musical-patterns/pattern'
import { entries, reduce } from '@musical-patterns/utilities'
import { UpdatedValidationsPlusIsValid, ValidateSubmittedSpecsParameters } from './types'
import { validateSpec } from './validateSpec'

const validateSubmittedSpecs: (parameters: ValidateSubmittedSpecsParameters) => UpdatedValidationsPlusIsValid =
    (parameters: ValidateSubmittedSpecsParameters): UpdatedValidationsPlusIsValid => {
        const { updatedDisplayedSpecs, configurations, computeValidations, specKey } = parameters

        const reevaluatedValidations: Validations = reduce(
            entries(updatedDisplayedSpecs),
            (accumulator: Validations, [ key, val ]: [ string, DomSpecValue ]) => ({
                ...accumulator,
                [ key ]: validateSpec(val, configurations[ key ]),
            }),
            {},
        )

        const validationForTheUpdatedSpecInAndOfItself: Validation =
            reevaluatedValidations && reevaluatedValidations[ specKey ]

        let validationsFromFunctionOfEntireSpecs: Validations
        if (computeValidations) {
            validationsFromFunctionOfEntireSpecs = computeValidations(updatedDisplayedSpecs as Specs)
        }

        const updatedValidations: Validations = {
            ...reevaluatedValidations,
            [ specKey ]: validationForTheUpdatedSpecInAndOfItself,
            ...validationsFromFunctionOfEntireSpecs,
        }

        return {
            isValid: !validationForTheUpdatedSpecInAndOfItself && !validationsFromFunctionOfEntireSpecs,
            updatedValidations,
        }
    }

export {
    validateSubmittedSpecs,
}
