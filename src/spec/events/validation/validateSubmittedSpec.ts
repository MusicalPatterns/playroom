import { InvalidSpecMessage, SpecValidationResults } from '@musical-patterns/pattern'
import { entries } from '@musical-patterns/utilities'
import { SpecValue } from '../../../types'
import { SpecValidationResult, ValidateSubmittedSpecParameters } from '../types'
import { validateSpecProperty } from './validateSpecProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResult =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResult => {
        const { updatedDisplayedSpec, specAttributes, validationFunction, specKey } = parameters

        const specValidationResultsAccumulator: SpecValidationResults = {}
        const reevaluatedSpecValidationResults: SpecValidationResults = entries(updatedDisplayedSpec)
            .reduce(
                // tslint:disable-next-line no-any
                (accumulator: SpecValidationResults, [ key, val ]: [ string, any ]) => ({
                    ...accumulator,
                    [ key ]: validateSpecProperty(val as SpecValue, specAttributes[ key ]),
                }),
                specValidationResultsAccumulator,
            )

        const standardInvalidMessageForThisProperty: InvalidSpecMessage =
            reevaluatedSpecValidationResults[ specKey ]

        let customSpecValidationResultsBasedOnEntireSpec: SpecValidationResults
        if (validationFunction) {
            customSpecValidationResultsBasedOnEntireSpec = validationFunction(updatedDisplayedSpec)
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
