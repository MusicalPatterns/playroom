import { Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { DomValueOrChecked } from '../../types'
import { SpecStateKeys } from '../state'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const handleArrayedPropertyElementAdd: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)

        const specAttributes: SpecAttributes = specState.get(SpecStateKeys.SPEC_ATTRIBUTES)
        const initialElementValue: Maybe<DomValueOrChecked> = specAttributes[ specKey ].arrayedNewElementInitialValue

        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] = arrayedSpecValue.concat([ initialElementValue || '' ])

        const actions: Action[] = buildAttemptSubmitActions({
            specKey,
            specState,
            specValue: updatedArrayedSpecValue,
            suppressInvalidMessages: true,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementAdd,
}
