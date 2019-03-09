import { ArrayedDomValue, ArrayedValue, Value } from '@musical-patterns/pattern'
import { from, HtmlValueOrChecked, isUndefined } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { Action, DispatchParameter } from '../../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import {
    BuildHandleSpecControlChangeEvent,
    HandleSpecControlChangeEvent,
    HandleSpecControlChangeEventParameters,
    MergeEventValueIntoValueParameters,
} from './types'

const mergeEventValueIntoArrayedValue: (parameters: MergeEventValueIntoValueParameters) => ArrayedValue =
    (parameters: MergeEventValueIntoValueParameters): ArrayedValue => {
        const { displayedSpec, property, fieldIndex, eventValue } = parameters

        const arrayedDisplayedValue: ArrayedDomValue = getArrayedDisplayedValue(displayedSpec, property)

        while (arrayedDisplayedValue.length < from.Ordinal(fieldIndex)) {
            arrayedDisplayedValue.push('')
        }
        arrayedDisplayedValue[ from.Ordinal(fieldIndex) ] = eventValue

        return arrayedDisplayedValue
    }

const buildHandleSpecControlChangeEvent: BuildHandleSpecControlChangeEvent =
    ({ dispatch }: DispatchParameter): HandleSpecControlChangeEvent =>
        async (parameters: HandleSpecControlChangeEventParameters): Promise<void> => {
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
    buildHandleSpecControlChangeEvent,
}
