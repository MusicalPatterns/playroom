import { Spec } from '@musical-patterns/pattern'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { Action, extractValueFromEvent } from '../../root'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKeys } from '../state'
import { mergeEventValueIntoSpecValue } from './helpers'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'
import { buildAttemptSubmitActions } from './validation'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    (dispatch: Dispatch): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const { arrayedPropertyIndex, event, specKey, specState } = parameters

            const eventValue: DomValueOrChecked = extractValueFromEvent(event)

            const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)

            let specValue: SpecValue = eventValue
            if (arrayedPropertyIndex !== undefined) {
                specValue = mergeEventValueIntoSpecValue({ eventValue, arrayedPropertyIndex, displayedSpec, specKey })
            }

            const actions: Action[] = buildAttemptSubmitActions({ specState, specKey, specValue })

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
