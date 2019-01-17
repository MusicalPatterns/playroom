import { PatternSpecPropertyAttributes, PatternSpecPropertyType, RangedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

const validByMin: (numericValue: number, min: Maybe<number>, excludeMin: boolean) => boolean =
    (numericValue: number, min: Maybe<number>, excludeMin: boolean): boolean => {
        if (!min) {
            return true
        }

        if (excludeMin) {
            if (numericValue <= min) {
                return false
            }
        }
        else {
            if (numericValue < min) {
                return false
            }
        }

        return true
    }

const validByMax: (numericValue: number, max: Maybe<number>, excludeMax: boolean) => boolean =
    (numericValue: number, max: Maybe<number>, excludeMax: boolean): boolean => {
        if (!max) {
            return true
        }

        if (excludeMax) {
            if (numericValue >= max) {
                return false
            }
        }
        else {
            if (numericValue > max) {
                return false
            }
        }

        return true
    }

const validByRangedConstraint: (numericValue: number, constraint: RangedConstraint) => boolean =
    (numericValue: number, constraint: RangedConstraint): boolean => {
        const { min, max, excludeMin = false, excludeMax = false, integer = false } = constraint

        if (integer && !Number.isInteger(numericValue)) {
            return false
        }
        if (!validByMin(numericValue, min, excludeMin)) {
            return false
        }
        if (!validByMax(numericValue, max, excludeMax)) {
            return false
        }

        return true
    }

const validate:
    (patternSpecValue: string, propertyAttributes: Maybe<PatternSpecPropertyAttributes>) => boolean =
    (patternSpecValue: string, propertyAttributes: Maybe<PatternSpecPropertyAttributes>): boolean => {
        if (!propertyAttributes) {
            return false
        }
        const { patternSpecPropertyType, constraint } = propertyAttributes

        if (patternSpecPropertyType === PatternSpecPropertyType.OPTIONED) {
            return true
        }

        let numericValue: number
        try {
            // tslint:disable-next-line:no-unsafe-any
            numericValue = JSON.parse(patternSpecValue)
        }
        catch (e) {
            return false
        }

        if (!constraint) {
            return true
        }

        return validByRangedConstraint(numericValue, constraint as RangedConstraint)
    }

export {
    validate,
}
