import { SingularPropertyInvalidSpecMessage, StringedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

const validByMaxLength: (textValue: string, maxLength: Maybe<number>) => SingularPropertyInvalidSpecMessage =
    (textValue: string, maxLength: Maybe<number>): SingularPropertyInvalidSpecMessage => {
        if (maxLength !== undefined && textValue.length > maxLength) {
            return `must be ${maxLength} characters or less`
        }

        return undefined
    }

const validByMinLength: (textValue: string, minLength: Maybe<number>) => SingularPropertyInvalidSpecMessage =
    (textValue: string, minLength: Maybe<number>): SingularPropertyInvalidSpecMessage => {
        if (minLength !== undefined && textValue.length < minLength) {
            return `must be ${minLength} characters or more`
        }

        return undefined
    }

const validByStringedConstraint:
    (textValue: string, constraint: Maybe<StringedConstraint>) => SingularPropertyInvalidSpecMessage =
    (textValue: string, constraint: Maybe<StringedConstraint>): SingularPropertyInvalidSpecMessage => {
        if (!constraint) {
            return undefined
        }

        const { maxLength, minLength } = constraint

        return validByMaxLength(textValue, maxLength) || validByMinLength(textValue, minLength)
    }

export {
    validByStringedConstraint,
}
