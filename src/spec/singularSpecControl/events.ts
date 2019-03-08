import { DomSpec, Value } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, isUndefined } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { extractValueOrCheckedFromEvent } from '../../extractValueOrCheckedFromEvent'
import { Action, DispatchAsProp } from '../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { SpecStateKey } from '../types'
import { mergeEventValueIntoArrayedValue } from './mergeEventValueIntoArrayedValue'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    ({ dispatch }: DispatchAsProp): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const { arrayedFieldIndex, event, property, specState } = parameters

            const eventValue: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)

            const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)

            let updatedValue: Value = eventValue
            if (!isUndefined(arrayedFieldIndex)) {
                updatedValue = mergeEventValueIntoArrayedValue({
                    arrayedFieldIndex,
                    displayedSpec,
                    eventValue,
                    property,
                })
            }

            const actions: Action[] = buildAttemptSubmitActions({ specState, property, updatedValue })

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
