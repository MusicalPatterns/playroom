import { SingularPropertyInvalidSpecMessage } from '../../types'
import { SpecControlStates } from '../types'

const validityClassName: (invalidMessage: SingularPropertyInvalidSpecMessage) => SpecControlStates =
    (invalidMessage: SingularPropertyInvalidSpecMessage): SpecControlStates =>
        !!invalidMessage ? SpecControlStates.INVALID : SpecControlStates.VALID

export {
    validityClassName,
}
