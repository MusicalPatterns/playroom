import { SingularPropertyInvalidSpecMessage } from '@musical-patterns/pattern'
import { SpecControlStates } from '../types'

const getValidityClass: (invalidSpecMessage: SingularPropertyInvalidSpecMessage) => SpecControlStates =
    (invalidSpecMessage: SingularPropertyInvalidSpecMessage): SpecControlStates =>
        !!invalidSpecMessage ? SpecControlStates.INVALID : SpecControlStates.VALID

export {
    getValidityClass,
}
