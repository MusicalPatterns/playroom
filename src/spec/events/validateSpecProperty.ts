import { RangedConstraint, SpecPropertyAttributes, SpecPropertyType } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

const validByMin: (numericValue: number, min: Maybe<number>, excludeMin: boolean) => Maybe<string> =
    (numericValue: number, min: Maybe<number>, excludeMin: boolean): Maybe<string> => {
        if (!min) {
            return undefined
        }

        if (excludeMin) {
            if (numericValue <= min) {
                return `must be greater than ${min}`
            }
        }
        else {
            if (numericValue < min) {
                return `must be greater than or equal to ${min}`
            }
        }

        return undefined
    }

const validByMax: (numericValue: number, max: Maybe<number>, excludeMax: boolean) => Maybe<string> =
    (numericValue: number, max: Maybe<number>, excludeMax: boolean): Maybe<string> => {
        if (!max) {
            return undefined
        }

        if (excludeMax) {
            if (numericValue >= max) {
                return `must be less than ${max}`
            }
        }
        else {
            if (numericValue > max) {
                return `must be less than or equal to ${max}`
            }
        }

        return undefined
    }

const validByStep: (numericValue: number, integer: Maybe<boolean>) => Maybe<string> =
    (numericValue: number, integer: Maybe<boolean>): Maybe<string> => {
        if (!integer) {
            return undefined
        }

        if (!Number.isInteger(numericValue)) {
            return `must be an integer`
        }

        return undefined
    }

const validByRangedConstraint: (numericValue: number, constraint: Maybe<RangedConstraint>) => Maybe<string> =
    (numericValue: number, constraint: Maybe<RangedConstraint>): Maybe<string> => {
        if (!constraint) {
            return undefined
        }

        const { min, max, excludeMin = false, excludeMax = false, integer = false } = constraint

        return validByStep(numericValue, integer) ||
            validByMin(numericValue, min, excludeMin) ||
            validByMax(numericValue, max, excludeMax)
    }

const validateSpecProperty:
    (specValue: string, propertyAttributes: Maybe<SpecPropertyAttributes>) => Maybe<string> =
    (specValue: string, propertyAttributes: Maybe<SpecPropertyAttributes>): Maybe<string> => {
        if (!propertyAttributes) {
            return undefined
        }
        const { specPropertyType, constraint } = propertyAttributes

        if (specPropertyType === SpecPropertyType.OPTIONED ||
            specPropertyType === SpecPropertyType.TOGGLED) {
            return undefined
        }

        let numericValue: number
        try {
            // tslint:disable-next-line:no-unsafe-any
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
