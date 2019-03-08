import {
    ArrayedPropertyInvalidSpecMessage,
    ArrayedSpecValue,
    SingularPropertyInvalidSpecMessage,
    SingularSpecValue,
} from '@musical-patterns/pattern'
import { apply, indexOfLastElement, isUndefined, Ordinal } from '@musical-patterns/utilities'

const calculateSubmittedSpecValue: (submittedSpecValues: ArrayedSpecValue, index: Ordinal) => SingularSpecValue =
    (submittedSpecValues: ArrayedSpecValue, index: Ordinal): SingularSpecValue => {
        if (index > indexOfLastElement(submittedSpecValues)) {
            return undefined
        }

        return apply.Ordinal(submittedSpecValues, index)
    }

const calculateInvalidSpecMessage:
    (invalidSpecMessages: ArrayedPropertyInvalidSpecMessage, index: Ordinal) => SingularPropertyInvalidSpecMessage =
    (invalidSpecMessages: ArrayedPropertyInvalidSpecMessage, index: Ordinal): SingularPropertyInvalidSpecMessage => {
        if (isUndefined(invalidSpecMessages) || index > indexOfLastElement(invalidSpecMessages)) {
            return undefined
        }

        return apply.Ordinal(invalidSpecMessages, index)
    }

export {
    calculateSubmittedSpecValue,
    calculateInvalidSpecMessage,
}
