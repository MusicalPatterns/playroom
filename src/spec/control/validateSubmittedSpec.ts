import { DomValue, Spec, ValidationResult, ValidationResults } from '@musical-patterns/pattern'
import { entries, reduce } from '@musical-patterns/utilities'
import { ValidateSubmittedSpecParameters, UpdatedValidationResultsPlusIsValid } from './types'
import { validateProperty } from './validateProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => UpdatedValidationResultsPlusIsValid =
    (parameters: ValidateSubmittedSpecParameters): UpdatedValidationResultsPlusIsValid => {
        const { updatedDisplayedSpec, attributes, validationFunction, property } = parameters

        const reevaluatedValidationResults: ValidationResults = reduce(
            entries(updatedDisplayedSpec),
            (accumulator: ValidationResults, [ key, val ]: [ string, DomValue ]) => ({
                ...accumulator,
                [ key ]: validateProperty(val, attributes[ key ]),
            }),
            {},
        )

        const validationResultForTheUpdatedPropertyInAndOfItself: ValidationResult =
            reevaluatedValidationResults && reevaluatedValidationResults[ property ]

        let validationResultsFromFunctionOfEntireSpec: ValidationResults
        if (validationFunction) {
            validationResultsFromFunctionOfEntireSpec = validationFunction(updatedDisplayedSpec as Spec)
        }

        const updatedValidationResults: ValidationResults = {
            ...reevaluatedValidationResults,
            [ property ]: validationResultForTheUpdatedPropertyInAndOfItself,
            ...validationResultsFromFunctionOfEntireSpec,
        }

        return {
            isValid: !validationResultForTheUpdatedPropertyInAndOfItself && !validationResultsFromFunctionOfEntireSpec,
            updatedValidationResults,
        }
    }

export {
    validateSubmittedSpec,
}
