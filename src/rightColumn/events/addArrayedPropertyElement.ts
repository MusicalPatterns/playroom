import { Spec, SpecAttributes } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { DomValueOrChecked } from '../../types'
import { RightColumnStateKey } from '../state'
import { HandleArrayedPropertyAddOrRemoveParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const handleArrayedPropertyElementAdd: (parameters: HandleArrayedPropertyAddOrRemoveParameters) => void =
    ({ dispatch, event, specKey, rightColumnState }: HandleArrayedPropertyAddOrRemoveParameters): void => {
        const displayedSpec: Spec = rightColumnState.get(RightColumnStateKey.DISPLAYED_SPEC)

        const specAttributes: SpecAttributes = rightColumnState.get(RightColumnStateKey.SPEC_ATTRIBUTES)
        const initialElementValue: Maybe<DomValueOrChecked> = specAttributes[ specKey ].arrayedNewElementInitialValue

        const arrayedSpecValue: DomValueOrChecked[] = displayedSpec[ specKey ] as DomValueOrChecked[]
        const updatedArrayedSpecValue: DomValueOrChecked[] = arrayedSpecValue.concat([ initialElementValue || '' ])

        const actions: Action[] = buildAttemptSubmitActions({
            rightColumnState,
            specKey,
            specValue: updatedArrayedSpecValue,
            suppressInvalidMessages: true,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedPropertyElementAdd,
}
