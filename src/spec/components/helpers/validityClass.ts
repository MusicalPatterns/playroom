import { SingularPropertyInvalidSpecMessage } from '../../types'
import { SpecControlStates } from '../types'

const getValidityClass: (invalidMessage: SingularPropertyInvalidSpecMessage) => SpecControlStates =
    (invalidMessage: SingularPropertyInvalidSpecMessage): SpecControlStates =>
        !!invalidMessage ? SpecControlStates.INVALID : SpecControlStates.VALID

export {
    getValidityClass,
}
