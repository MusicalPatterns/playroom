import { Value } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, isUndefined } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { Action, DispatchParameter } from '../../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { mergeEventValueIntoArrayedValue } from './mergeEventValueIntoArrayedValue'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    ({ dispatch }: DispatchParameter): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const {
                fieldIndex,
                event,
                property,
                displayedSpec,
                submittedSpec,
                validationFunction,
                attributes,
            } = parameters

            const eventValue: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)

            let updatedValue: Value = eventValue
            if (!isUndefined(fieldIndex)) {
                updatedValue = mergeEventValueIntoArrayedValue({
                    displayedSpec,
                    eventValue,
                    fieldIndex,
                    property,
                })
            }

            const actions: Action[] = buildAttemptSubmitActions({
                attributes,
                displayedSpec,
                property,
                submittedSpec,
                updatedValue,
                validationFunction,
            })

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
