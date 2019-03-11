import { ArrayedDomSpecValue, ArrayedValidation, Validations } from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, isUndefined, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { computeArrayedDisplayedValue, computeArrayedValidation } from '../../arrayedValues'
import { computeAttemptSubmitActions } from '../../submit'
import { HandleFieldRemoveParameters } from './types'

const isNoInvalidMessageForRemovedField: (validations: Validations, specKey: string) => boolean =
    (validations: Validations, specKey: string): boolean => {
        if (isUndefined(validations)) {
            return true
        }

        const arrayedValidation: ArrayedValidation = computeArrayedValidation(validations, specKey)
        if (isUndefined(arrayedValidation)) {
            return true
        }

        return isUndefined(lastElement(arrayedValidation))
    }

const handleFieldRemove: (parameters: HandleFieldRemoveParameters) => void =
    (parameters: HandleFieldRemoveParameters): void => {
        const {
            dispatch,
            specKey,
            configurations,
            displayedSpecs,
            submittedSpecs,
            computeValidations,
            validations,
        } = parameters
        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)

        const updatedArrayedDisplayedValue: ArrayedDomSpecValue = slice(
            arrayedDisplayedValue,
            INITIAL,
            indexOfLastElement(arrayedDisplayedValue),
        )

        const removedFieldHasNoInvalidMessages: boolean =
            isNoInvalidMessageForRemovedField(validations, specKey)

        const removedFieldIsEmpty: boolean = lastElement(arrayedDisplayedValue) === ''
        const suppressReevaluatingValidations: boolean = removedFieldIsEmpty && removedFieldHasNoInvalidMessages

        const actions: Action[] = computeAttemptSubmitActions({
            computeValidations,
            configurations,
            displayedSpecs,
            specKey,
            submittedSpecs,
            suppressReevaluatingValidations,
            updatedValue: updatedArrayedDisplayedValue,
        })

        dispatch(batchActions(actions))
    }

export {
    handleFieldRemove,
}
