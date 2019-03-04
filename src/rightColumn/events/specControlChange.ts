import { Spec } from '@musical-patterns/pattern'
import { batchActions } from 'redux-batched-actions'
import { Action, extractValueFromEvent } from '../../root'
import { DispatchAsProp, DomValueOrChecked, SpecValue } from '../../types'
import { RightColumnStateKey } from '../state'
import { mergeEventValueIntoSpecValue } from './helpers'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    ({ dispatch }: DispatchAsProp): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const { arrayedPropertyIndex, event, specKey, rightColumnState } = parameters

            const eventValue: DomValueOrChecked = extractValueFromEvent(event)

            const displayedSpec: Spec = rightColumnState.get(RightColumnStateKey.DISPLAYED_SPEC)

            let specValue: SpecValue = eventValue
            if (arrayedPropertyIndex !== undefined) {
                specValue = mergeEventValueIntoSpecValue({ eventValue, arrayedPropertyIndex, displayedSpec, specKey })
            }

            const actions: Action[] = buildAttemptSubmitActions({ rightColumnState, specKey, specValue })

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
