import { ArrayedDomSpecValue, DomSpec, SpecAttributes } from '@musical-patterns/pattern'
import { DomValueOrChecked, Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { SpecStateKey } from '../state'
import { getArrayedDomSpecValue } from './helpers'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const handleArrayedPropertyElementAdd: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, specState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)

        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const initialElementValue: Maybe<DomValueOrChecked> = specAttributes[ specKey ].arrayedNewElementInitialValue

        const arrayedSpecValue: ArrayedDomSpecValue = getArrayedDomSpecValue(displayedSpec, specKey)

        const updatedArrayedSpecValue: ArrayedDomSpecValue = arrayedSpecValue.concat([ initialElementValue || '' ])

        const actions: Action[] = buildAttemptSubmitActions({
            specKey,
            specState,
            specValue: updatedArrayedSpecValue,
            suppressSpecValidationResults: true,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementAdd,
}
