import {
    Configuration,
    DomSpecValue,
    InputType,
    RangedConstraint,
    StringedConstraint,
    Validation,
} from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDisplayedValue } from '../typeGuards'
import { validateArrayedSpec } from './validateArrayedSpec'
import { validByRangedConstraint } from './validByRangedConstraint'
import { validByStringedConstraint } from './validByStringedConstraint'

const validationRequired: (configuration: Maybe<Configuration>) => configuration is Configuration =
    (configuration: Maybe<Configuration>): configuration is Configuration => {
        if (isUndefined(configuration)) {
            return false
        }

        return !(configuration.inputType === InputType.OPTIONED ||
            configuration.inputType === InputType.TOGGLED)
    }

const validateSpec: (displayedValue: DomSpecValue, configuration: Maybe<Configuration>) => Validation =
    (displayedValue: DomSpecValue, configuration: Maybe<Configuration>): Validation => {
        if (!validationRequired(configuration)) {
            return undefined
        }
        const { constraint, inputType } = configuration

        if (isArrayedDisplayedValue(displayedValue)) {
            return validateArrayedSpec(displayedValue, configuration)
        }

        if (inputType === InputType.STRINGED) {
            return validByStringedConstraint(displayedValue as string, constraint as Maybe<StringedConstraint>)
        }

        let numericValue: number
        try {
            numericValue = JSON.parse(displayedValue as string)
        }
        catch (e) {
            return 'this input is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateSpec,
}
