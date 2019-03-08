import { RangedConstraint, SingularValidationResult } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'

const validByMin:
    (numericValue: number, min: Maybe<number>, excludeMin: boolean) => SingularValidationResult =
    (numericValue: number, min: Maybe<number>, excludeMin: boolean): SingularValidationResult => {
        if (isUndefined(min)) {
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

const validByMax:
    (numericValue: number, max: Maybe<number>, excludeMax: boolean) => SingularValidationResult =
    (numericValue: number, max: Maybe<number>, excludeMax: boolean): SingularValidationResult => {
        if (isUndefined(max)) {
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

const validByStep: (numericValue: number, integer: Maybe<boolean>) => SingularValidationResult =
    (numericValue: number, integer: Maybe<boolean>): SingularValidationResult => {
        if (isUndefined(integer)) {
            return undefined
        }

        if (!Number.isInteger(numericValue)) {
            return `must be an integer`
        }

        return undefined
    }

const validByRangedConstraint:
    (numericValue: number, constraint: Maybe<RangedConstraint>) => SingularValidationResult =
    (numericValue: number, constraint: Maybe<RangedConstraint>): SingularValidationResult => {
        if (isUndefined(constraint)) {
            return undefined
        }

        const { min, max, excludeMin = false, excludeMax = false, integer = false } = constraint

        return validByStep(numericValue, integer) ||
            validByMin(numericValue, min, excludeMin) ||
            validByMax(numericValue, max, excludeMax)
    }

export {
    validByRangedConstraint,
}
