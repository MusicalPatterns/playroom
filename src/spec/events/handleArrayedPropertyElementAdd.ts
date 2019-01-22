import { Spec } from '@musical-patterns/pattern'
import { ActionType } from '../../root'
import { DomValueOrChecked } from '../../types'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'

const handleArrayedPropertyElementAdd: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, displayedSpec }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedSpec: Spec = {
            ...displayedSpec,
            [ specKey ]: arrayedSpecValue.concat([ '' ]),
        }

        dispatch({ type: ActionType.SET_DISPLAYED_SPEC, data: updatedSpec })
    }

export {
    handleArrayedPropertyElementAdd,
}
