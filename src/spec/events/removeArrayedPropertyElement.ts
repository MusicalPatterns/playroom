import { InvalidSpecMessage, Spec, SpecValidationResults } from '@musical-patterns/pattern'
import { indexOfLastElement, INITIAL, lastElement, slice } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { DomValueOrChecked } from '../../types'
import { SpecStateKey } from '../state'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const handleArrayedPropertyElementRemove: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: Spec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const specValidationResults: SpecValidationResults = specState.get(SpecStateKey.SPEC_VALIDATION_RESULTS)
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] = slice(
            arrayedSpecValue,
            INITIAL,
            indexOfLastElement(arrayedSpecValue),
        )

        const noInvalidMessageForRemovedElement: boolean = !specValidationResults ||
            !specValidationResults[ specKey ] ||
            !lastElement<InvalidSpecMessage>(specValidationResults[ specKey ])

        const removedElementWasEmpty: boolean = lastElement(arrayedSpecValue) === ''
        const suppressSpecValidationResults: boolean = removedElementWasEmpty && noInvalidMessageForRemovedElement

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
