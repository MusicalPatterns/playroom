import { DomSpec, SpecValue } from '@musical-patterns/pattern'
import { DomValueOrChecked, isUndefined } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { extractValueFromEvent } from '../../extractValueFromEvent'
import { Action, DispatchAsProp } from '../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { SpecStateKey } from '../types'
import { mergeEventValueIntoArrayedSpecValue } from './mergeEventValueIntoArrayedSpecValue'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    ({ dispatch }: DispatchAsProp): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const { arrayedPropertyIndex, event, specKey, specState } = parameters

            const eventValue: DomValueOrChecked = extractValueFromEvent(event)

            const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)

            let specValue: SpecValue = eventValue
            if (!isUndefined(arrayedPropertyIndex)) {
                specValue = mergeEventValueIntoArrayedSpecValue({
                    arrayedPropertyIndex,
                    displayedSpec,
                    eventValue,
                    specKey,
                })
            }

            const actions: Action[] = buildAttemptSubmitActions({ specState, specKey, specValue })

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
