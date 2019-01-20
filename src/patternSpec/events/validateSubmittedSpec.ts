import { PatternSpecValidationResults } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { InvalidPatternSpecMessages } from '../types'
import { SpecValidationResults, ValidateSubmittedSpecParameters } from './types'
import { validateSpecProperty } from './validateSpecProperty'

const validateSubmittedSpec: (parameters: ValidateSubmittedSpecParameters) => SpecValidationResults =
    (parameters: ValidateSubmittedSpecParameters): SpecValidationResults => {
        const { updatedPatternSpec, patternSpecAttributes, validationFunction, patternSpecKey } = parameters

        const invalidMessageAccumulator: InvalidPatternSpecMessages = {}
        const reevaluatedInvalidMessages: InvalidPatternSpecMessages = Object.entries(updatedPatternSpec)
            .reduce(
                (accumulator: InvalidPatternSpecMessages, [ key, val ]: [ string, string ]) => ({
                    ...accumulator,
                    [ key ]: validateSpecProperty(val, patternSpecAttributes[ key ]),
                }),
                invalidMessageAccumulator,
            )

        const standardInvalidMessageForThisProperty: Maybe<string> = reevaluatedInvalidMessages[ patternSpecKey ]

        let customInvalidMessagesBasedOnEntireSpec: PatternSpecValidationResults
        if (validationFunction) {
            customInvalidMessagesBasedOnEntireSpec = validationFunction(updatedPatternSpec)
        }

        const updatedInvalidMessages: InvalidPatternSpecMessages = {
            ...reevaluatedInvalidMessages,
            [ patternSpecKey ]: standardInvalidMessageForThisProperty,
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
