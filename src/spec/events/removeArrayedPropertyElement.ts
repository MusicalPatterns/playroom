import {
    ArrayedDomSpecValue,
    DomSpec,
    SingularPropertyInvalidSpecMessage,
    SpecValidationResults,
} from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { SpecStateKey } from '../state'
import { getArrayedDomSpecValue } from './helpers'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const isNoInvalidSpecMessageForRemovedElement:
    (specValidationResults: SpecValidationResults, specKey: string) => boolean =
    (specValidationResults: SpecValidationResults, specKey: string): boolean => {
        if (!specValidationResults) {
            return true
        }

        if (!specValidationResults[ specKey ]) {
            return true
        }

        const arrayedPropertyInvalidSpecMessage: SingularPropertyInvalidSpecMessage[] =
            specValidationResults[ specKey ] as SingularPropertyInvalidSpecMessage[]

        return !lastElement(arrayedPropertyInvalidSpecMessage)
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
