import { Spec } from '@musical-patterns/pattern'
import { ActionType } from '../../root'
import { DomValueOrChecked } from '../../types'
import { SpecStateKeys } from '../state'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'

const handleArrayedPropertyElementAdd: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)

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
