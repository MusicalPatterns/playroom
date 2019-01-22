import { Spec } from '@musical-patterns/pattern'
import { apply, from, INITIAL, to } from '@musical-patterns/utilities'
import { ActionType } from '../../root'
import { DomValueOrChecked } from '../../types'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'

const handleArrayedPropertyElementRemove: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, displayedSpec }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] =
            arrayedSpecValue.slice(from.Index(INITIAL), apply.Offset(arrayedSpecValue.length, to.Offset(-1)))
        const updatedSpec: Spec = {
            ...displayedSpec,
            [ specKey ]: updatedArrayedSpecValue,
        }

        dispatch({ type: ActionType.SET_DISPLAYED_SPEC, data: updatedSpec })
    }

export {
    handleArrayedPropertyElementRemove,
}
