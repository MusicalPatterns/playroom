import { SpecValidationResults } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { InvalidSpecMessages } from '../types'
import { SpecValidationResult, ValidateSubmittedSpecParameters } from './types'
import { validateSpecProperty } from './validateSpecProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResult =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResult => {
        const { updatedSpec, specAttributes, validationFunction, specKey } = parameters

        const invalidMessageAccumulator: InvalidSpecMessages = {}
        const reevaluatedInvalidMessages: InvalidSpecMessages = Object.entries(updatedSpec)
            .reduce(
                (accumulator: InvalidSpecMessages, [ key, val ]: [ string, string ]) => ({
                    ...accumulator,
                    [ key ]: validateSpecProperty(val, specAttributes[ key ]),
                }),
                invalidMessageAccumulator,
            )

        const standardInvalidMessageForThisProperty: Maybe<string> = reevaluatedInvalidMessages[ specKey ]

        let customInvalidMessagesBasedOnEntireSpec: SpecValidationResults
        if (validationFunction) {
            customInvalidMessagesBasedOnEntireSpec = validationFunction(updatedSpec)
        }

        const updatedInvalidMessages: InvalidSpecMessages = {
            ...reevaluatedInvalidMessages,
            [ specKey ]: standardInvalidMessageForThisProperty,
            ...customInvalidMessagesBasedOnEntireSpec,
        }

        return {
            isValid: !standardInvalidMessageForThisProperty && !customInvalidMessagesBasedOnEntireSpec,
            updatedInvalidMessages,
        }
    }

export {
    validateSubmittedSpec,
}
