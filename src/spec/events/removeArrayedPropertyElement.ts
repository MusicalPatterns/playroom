import { Spec } from '@musical-patterns/pattern'
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
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] = slice(
            arrayedSpecValue,
            INITIAL,
            indexOfLastElement(arrayedSpecValue),
        )

        const actions: Action[] = buildAttemptSubmitActions({
            specKey,
            specState,
            specValue: updatedArrayedSpecValue,
            suppressSpecValidationResults: lastElement(arrayedSpecValue) === '',
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementRemove,
}
