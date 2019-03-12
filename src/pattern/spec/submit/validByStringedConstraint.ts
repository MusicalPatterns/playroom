import { SingularValidation, StringedConstraint } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'

const validByMaxLength: (textValue: string, maxLength: Maybe<number>) => SingularValidation =
    (textValue: string, maxLength: Maybe<number>): SingularValidation => {
        if (!isUndefined(maxLength) && textValue.length > maxLength) {
            return `must be ${maxLength} characters or less`
        }

        return undefined
    }

const validByMinLength: (textValue: string, minLength: Maybe<number>) => SingularValidation =
    (textValue: string, minLength: Maybe<number>): SingularValidation => {
        if (!isUndefined(minLength) && textValue.length < minLength) {
            return `must be ${minLength} characters or more`
        }

        return undefined
    }

const validByStringedConstraint:
    (textValue: string, constraint: Maybe<StringedConstraint>) => SingularValidation =
    (textValue: string, constraint: Maybe<StringedConstraint>): SingularValidation => {
        if (isUndefined(constraint)) {
            return undefined
        }

        const { maxLength, minLength } = constraint

        return validByMaxLength(textValue, maxLength) || validByMinLength(textValue, minLength)
    }

export {
    validByStringedConstraint,
}
