import {
    DomValue,
    PropertyAttributes,
    PropertyType,
    RangedConstraint,
    StringedConstraint,
    ValidationResult,
} from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDisplayedValue } from '../typeGuards'
import { validateArrayedProperty } from './validateArrayedProperty'
import { validByRangedConstraint } from './validByRangedConstraint'
import { validByStringedConstraint } from './validByStringedConstraint'

const validationRequired: (propertyAttributes: Maybe<PropertyAttributes>) => propertyAttributes is PropertyAttributes =
    (propertyAttributes: Maybe<PropertyAttributes>): propertyAttributes is PropertyAttributes => {
        if (isUndefined(propertyAttributes)) {
            return false
        }

        return !(propertyAttributes.propertyType === PropertyType.OPTIONED ||
            propertyAttributes.propertyType === PropertyType.TOGGLED)
    }

const validateProperty:
    (displayedValue: DomValue, propertyAttributes: Maybe<PropertyAttributes>) => ValidationResult =
    (displayedValue: DomValue, propertyAttributes: Maybe<PropertyAttributes>): ValidationResult => {
        if (!validationRequired(propertyAttributes)) {
            return undefined
        }
        const { constraint, propertyType } = propertyAttributes

        if (isArrayedDisplayedValue(displayedValue)) {
            return validateArrayedProperty(displayedValue, propertyAttributes)
        }

        if (propertyType === PropertyType.STRINGED) {
            return validByStringedConstraint(displayedValue as string, constraint as Maybe<StringedConstraint>)
        }

        let numericValue: number
        try {
            numericValue = JSON.parse(displayedValue as string)
        }
        catch (e) {
            return 'this property is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateProperty,
}
