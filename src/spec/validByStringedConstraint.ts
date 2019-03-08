import { SingularValidationResult, StringedConstraint } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'

const validByMaxLength: (textValue: string, maxLength: Maybe<number>) => SingularValidationResult =
    (textValue: string, maxLength: Maybe<number>): SingularValidationResult => {
        if (!isUndefined(maxLength) && textValue.length > maxLength) {
            return `must be ${maxLength} characters or less`
        }

        return undefined
    }

const validByMinLength: (textValue: string, minLength: Maybe<number>) => SingularValidationResult =
    (textValue: string, minLength: Maybe<number>): SingularValidationResult => {
        if (!isUndefined(minLength) && textValue.length < minLength) {
            return `must be ${minLength} characters or more`
        }

        return undefined
    }

const validByStringedConstraint:
    (textValue: string, constraint: Maybe<StringedConstraint>) => SingularValidationResult =
    (textValue: string, constraint: Maybe<StringedConstraint>): SingularValidationResult => {
        if (isUndefined(constraint)) {
            return undefined
        }

        const { maxLength, minLength } = constraint

        return validByMaxLength(textValue, maxLength) || validByMinLength(textValue, minLength)
    }

export {
    validByStringedConstraint,
}
