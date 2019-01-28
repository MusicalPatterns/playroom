import { RangedConstraint, SpecPropertyAttributes, SpecPropertyType } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { SpecValue } from '../../../types'
import { InvalidSpecMessage } from '../../types'
import { validateArrayedSpecProperty } from './validateArrayedSpecProperty'
import { validByRangedConstraint } from './validByRangedConstraint'

const validateSpecProperty:
    (specValue: SpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>) => InvalidSpecMessage =
    // tslint:disable-next-line:cyclomatic-complexity
    (specValue: SpecValue, propertyAttributes: Maybe<SpecPropertyAttributes>): InvalidSpecMessage => {
        if (!propertyAttributes) {
            return undefined
        }
        const { specPropertyType, constraint } = propertyAttributes

        if (specPropertyType === SpecPropertyType.OPTIONED ||
            specPropertyType === SpecPropertyType.TOGGLED) {
            return undefined
        }

        if (specValue instanceof Array) {
            return validateArrayedSpecProperty(specValue, propertyAttributes)
        }

        let numericValue: number
        try {
            // @ts-ignore
            numericValue = JSON.parse(specValue)
        }
        catch (e) {
            return 'this property is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateSpecProperty,
}
