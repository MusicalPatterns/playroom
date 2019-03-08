import { DomValue, Spec, ValidationResult, ValidationResults } from '@musical-patterns/pattern'
import { entries, reduce } from '@musical-patterns/utilities'
import { SpecValidationResult, ValidateSubmittedSpecParameters } from './types'
import { validateProperty } from './validateProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResult =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResult => {
        const { updatedDisplayedSpec, attributes, validationFunction, property } = parameters

        const reevaluatedValidationResults: ValidationResults = reduce(
            entries(updatedDisplayedSpec),
            (accumulator: ValidationResults, [ key, val ]: [ string, DomValue ]) => ({
                ...accumulator,
                [ key ]: validateProperty(val, attributes[ key ]),
            }),
            {},
        )

        const validationResultForThisPropertyInAndOfItself: ValidationResult =
            reevaluatedValidationResults && reevaluatedValidationResults[ property ]

        let validationResultsFromFunctionOfEntireSpec: ValidationResults
        if (validationFunction) {
            validationResultsFromFunctionOfEntireSpec = validationFunction(updatedDisplayedSpec as Spec)
        }

        const updatedValidationResults: ValidationResults = {
            ...reevaluatedValidationResults,
            [ property ]: validationResultForThisPropertyInAndOfItself,
            ...validationResultsFromFunctionOfEntireSpec,
        }

        return {
            isValid: !validationResultForThisPropertyInAndOfItself && !validationResultsFromFunctionOfEntireSpec,
            updatedValidationResults,
        }
    }

export {
    validateSubmittedSpec,
}
