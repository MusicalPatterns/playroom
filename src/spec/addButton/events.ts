import { ArrayedDomValue, Attributes, DomSpec } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import { HandleArrayedSpecControlAddOrRemoveParameters, SpecStateKey } from '../types'

const handleArrayedSpecControlAdd: (parameters: HandleArrayedSpecControlAddOrRemoveParameters) => void =
    ({ dispatch, event, property, specState }: HandleArrayedSpecControlAddOrRemoveParameters): void => {
        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)

        const attributes: Attributes = specState.get(SpecStateKey.ATTRIBUTES)
        const initialFieldValue: Maybe<HtmlValueOrChecked> = attributes[ property ].arrayedNewFieldInitialValue

        const arrayedDisplayedValue: ArrayedDomValue = getArrayedDisplayedValue(displayedSpec, property)

        const updatedArrayedDisplayedValue: ArrayedDomValue =
            arrayedDisplayedValue.concat([ initialFieldValue || '' ])

        const actions: Action[] = buildAttemptSubmitActions({
            property,
            specState,
            suppressReevaluatingValidationResults: true,
            updatedValue: updatedArrayedDisplayedValue,
        })

        dispatch(batchActions(actions))
    }

export {
    handleArrayedSpecControlAdd,
}
