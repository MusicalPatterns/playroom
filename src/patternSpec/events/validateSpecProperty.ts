import { PatternSpecPropertyAttributes, PatternSpecPropertyType, RangedConstraint } from '@musical-patterns/pattern'
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
    (patternSpecValue: string, propertyAttributes: Maybe<PatternSpecPropertyAttributes>) => Maybe<string> =
    (patternSpecValue: string, propertyAttributes: Maybe<PatternSpecPropertyAttributes>): Maybe<string> => {
        if (!propertyAttributes) {
            return 'error: missing property attributes'
        }
        const { patternSpecPropertyType, constraint } = propertyAttributes

        if (patternSpecPropertyType === PatternSpecPropertyType.OPTIONED) {
            return undefined
        }

        let numericValue: number
        try {
            // tslint:disable-next-line:no-unsafe-any
            numericValue = JSON.parse(patternSpecValue)
        }
        catch (e) {
            return 'this property is formatted in a way which cannot be parsed'
        }

        return validByRangedConstraint(numericValue, constraint as Maybe<RangedConstraint>)
    }

export {
    validateSpecProperty,
}
