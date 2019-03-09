import {
    ArrayedDomValue,
    ArrayedValidationResult,
    ValidationResult,
    ValidationResults,
} from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, isUndefined, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { buildAttemptSubmitActions } from '../../attemptSubmitActions'
import { getArrayedDisplayedValue } from '../../getArrayedDisplayedValue'
import { HandleFieldRemoveParameters } from './types'

const isArrayedValidationResult:
    (validationResult: ValidationResult) => validationResult is ArrayedValidationResult =
    (validationResult: ValidationResult): validationResult is ArrayedValidationResult =>
        validationResult instanceof Array

const isNoInvalidMessageForRemovedField:
    (validationResults: ValidationResults, property: string) => boolean =
    (validationResults: ValidationResults, property: string): boolean => {
        if (isUndefined(validationResults)) {
            return true
        }

        const validationResult: ValidationResult = validationResults[ property ]
        if (isUndefined(validationResult)) {
            return true
        }
        if (!isArrayedValidationResult(validationResult)) {
            throw new Error('cannot treat a singular spec control as arrayed')
        }

        return isUndefined(lastElement(validationResult))
    }

const handleFieldRemove: (parameters: HandleFieldRemoveParameters) => void =
    (parameters: HandleFieldRemoveParameters): void => {
        const {
            dispatch,
            property,
            attributes,
            displayedSpec,
            submittedSpec,
            validationFunction,
            validationResults,
        } = parameters
        const arrayedDisplayedValue: ArrayedDomValue = getArrayedDisplayedValue(displayedSpec, property)

        const updatedArrayedDisplayedValue: ArrayedDomValue = slice(
            arrayedDisplayedValue,
            INITIAL,
            indexOfLastElement(arrayedDisplayedValue),
        )

        const removedFieldHasNoInvalidMessages: boolean =
            isNoInvalidMessageForRemovedField(validationResults, property)

        const removedFieldIsEmpty: boolean = lastElement(arrayedDisplayedValue) === ''
        const suppressReevaluatingValidationResults: boolean = removedFieldIsEmpty && removedFieldHasNoInvalidMessages

        const actions: Action[] = buildAttemptSubmitActions({
            attributes,
            displayedSpec,
            property,
            submittedSpec,
            suppressReevaluatingValidationResults,
            updatedValue: updatedArrayedDisplayedValue,
            validationFunction,
        })

        dispatch(batchActions(actions))
    }

export {
    handleFieldRemove,
}
