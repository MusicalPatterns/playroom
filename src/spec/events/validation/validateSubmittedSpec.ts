import { DomSpecValue, InvalidSpecMessage, Spec, SpecValidationResults } from '@musical-patterns/pattern'
import { entries } from '@musical-patterns/utilities'
import { SpecValidationResult, ValidateSubmittedSpecParameters } from '../types'
import { validateSpecProperty } from './validateSpecProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResult =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResult => {
        const { updatedDisplayedSpec, specAttributes, validationFunction, specKey } = parameters

        const reevaluatedSpecValidationResults: SpecValidationResults = entries(updatedDisplayedSpec)
            .reduce<SpecValidationResults>(
                (accumulator: SpecValidationResults, [ key, val ]: [ string, DomSpecValue ]) => ({
                    ...accumulator,
                    [ key ]: validateSpecProperty(val, specAttributes[ key ]),
                }),
                {},
            )

        const standardInvalidMessageForThisProperty: InvalidSpecMessage =
            reevaluatedSpecValidationResults && reevaluatedSpecValidationResults[ specKey ]

        let customSpecValidationResultsBasedOnEntireSpec: SpecValidationResults
        if (validationFunction) {
            customSpecValidationResultsBasedOnEntireSpec = validationFunction(updatedDisplayedSpec as Spec)
        }

        const updatedSpecValidationResults: SpecValidationResults = {
            ...reevaluatedSpecValidationResults,
            [ specKey ]: standardInvalidMessageForThisProperty,
            ...customSpecValidationResultsBasedOnEntireSpec,
        }

        return {
            isValid: !standardInvalidMessageForThisProperty && !customSpecValidationResultsBasedOnEntireSpec,
            updatedSpecValidationResults,
        }
    }

export {
    validateSubmittedSpec,
}
