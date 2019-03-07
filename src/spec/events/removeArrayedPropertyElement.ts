import { ArrayedDomSpecValue, DomSpec, InvalidSpecMessage, SpecValidationResults } from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, isUndefined, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { SpecStateKey } from '../state'
import { getArrayedDomSpecValue, isArrayedPropertyInvalidSpecMessage } from './helpers'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const isNoInvalidSpecMessageForRemovedElement:
    (specValidationResults: SpecValidationResults, specKey: string) => boolean =
    (specValidationResults: SpecValidationResults, specKey: string): boolean => {
        if (isUndefined(specValidationResults)) {
            return true
        }

        const invalidSpecMessage: InvalidSpecMessage = specValidationResults[ specKey ]
        if (isUndefined(invalidSpecMessage)) {
            return true
        }
        if (!isArrayedPropertyInvalidSpecMessage(invalidSpecMessage)) {
            throw new Error('tried to check invalid spec message array for non-arrayed element')
        }

        return isUndefined(lastElement(invalidSpecMessage))
    }

const handleArrayedPropertyElementRemove: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const specValidationResults: SpecValidationResults = specState.get(SpecStateKey.SPEC_VALIDATION_RESULTS)

        const arrayedSpecValue: ArrayedDomSpecValue = getArrayedDomSpecValue(displayedSpec, specKey)

        const updatedArrayedSpecValue: ArrayedDomSpecValue = slice(
            arrayedSpecValue,
            INITIAL,
            indexOfLastElement(arrayedSpecValue),
        )

        const removedElementHasNoInvalidSpecMessages: boolean =
            isNoInvalidSpecMessageForRemovedElement(specValidationResults, specKey)

        const removedElementWasEmpty: boolean = lastElement(arrayedSpecValue) === ''
        const suppressSpecValidationResults: boolean = removedElementWasEmpty && removedElementHasNoInvalidSpecMessages

        const actions: Action[] = buildAttemptSubmitActions({
            specKey,
            specState,
            specValue: updatedArrayedSpecValue,
            suppressSpecValidationResults,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementRemove,
}
