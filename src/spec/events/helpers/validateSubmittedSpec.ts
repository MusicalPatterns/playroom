import { SpecValidationResults } from '@musical-patterns/pattern'
import { SpecValue } from '../../../types'
import { InvalidSpecMessage, InvalidSpecMessages } from '../../types'
import { SpecValidationResult, ValidateSubmittedSpecParameters } from '../types'
import { validateSpecProperty } from './validateSpecProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResult =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResult => {
        const { updatedDisplayedSpec, specAttributes, validationFunction, specKey } = parameters

        const invalidMessageAccumulator: InvalidSpecMessages = {}
        const reevaluatedInvalidMessages: InvalidSpecMessages = Object.entries(updatedDisplayedSpec)
            .reduce(
                (accumulator: InvalidSpecMessages, [ key, val ]: [ string, SpecValue ]) => ({
                    ...accumulator,
                    [ key ]: validateSpecProperty(val, specAttributes[ key ]),
                }),
                invalidMessageAccumulator,
            )

        const standardInvalidMessageForThisProperty: InvalidSpecMessage =
            reevaluatedInvalidMessages[ specKey ]

        let customInvalidMessagesBasedOnEntireSpec: SpecValidationResults
        if (validationFunction) {
            customInvalidMessagesBasedOnEntireSpec = validationFunction(updatedDisplayedSpec)
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
