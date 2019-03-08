import { ArrayedDomValue, DomSpec, ValidationResult, ValidationResults } from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, isUndefined, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { SpecStateKey } from '../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import { HandleArrayedSpecControlAddOrRemoveParameters } from '../types'
import { isArrayedValidationResult } from './isArrayedValidationResult'

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

const handleArrayedSpecControlRemove: (parameters: HandleArrayedSpecControlAddOrRemoveParameters) => void =
    ({ dispatch, event, property, specState }: HandleArrayedSpecControlAddOrRemoveParameters): void => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const validationResults: ValidationResults = specState.get(SpecStateKey.VALIDATION_RESULTS)

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
            property,
            specState,
            suppressReevaluatingValidationResults,
            updatedValue: updatedArrayedDisplayedValue,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedSpecControlRemove,
}
