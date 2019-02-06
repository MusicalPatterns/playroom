import { Spec } from '@musical-patterns/pattern'
import { apply, from, INITIAL, to } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { DomValueOrChecked } from '../../types'
import { SpecStateKeys } from '../state'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const handleArrayedPropertyElementRemove: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] = arrayedSpecValue.slice(
            from.Ordinal(INITIAL),
            apply.Translation(arrayedSpecValue.length, to.Translation(-1)),
        )

        const actions: Action[] = buildAttemptSubmitActions({ specState, specKey, specValue: updatedArrayedSpecValue })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementRemove,
}
