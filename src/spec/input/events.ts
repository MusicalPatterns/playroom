import { ArrayedDomValue, ArrayedValue, Value } from '@musical-patterns/pattern'
import { from, HtmlValueOrChecked, isUndefined } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { extractValueOrCheckedFromEvent } from '../../extractValueOrCheckedFromEvent'
import { Action, DispatchParameter } from '../../types'
import { computeArrayedDisplayedValue } from '../arrayedValues'
import { computeAttemptSubmitActions } from '../submit'
import {
    ComputeHandleFieldChangeEvent,
    HandleFieldChangeEvent,
    HandleFieldChangeEventParameters,
    MergeEventValueIntoValueParameters,
} from './types'

const mergeEventValueIntoArrayedValue: (parameters: MergeEventValueIntoValueParameters) => ArrayedValue =
    (parameters: MergeEventValueIntoValueParameters): ArrayedValue => {
        const { displayedSpec, property, fieldIndex, eventValue } = parameters

        const arrayedDisplayedValue: ArrayedDomValue = computeArrayedDisplayedValue(displayedSpec, property)

        while (arrayedDisplayedValue.length < from.Ordinal(fieldIndex)) {
            arrayedDisplayedValue.push('')
        }
        arrayedDisplayedValue[ from.Ordinal(fieldIndex) ] = eventValue

        return arrayedDisplayedValue
    }

const computeHandleFieldChangeEvent: ComputeHandleFieldChangeEvent =
    ({ dispatch }: DispatchParameter): HandleFieldChangeEvent =>
        async (parameters: HandleFieldChangeEventParameters): Promise<void> => {
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

            const actions: Action[] = computeAttemptSubmitActions({
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
    computeHandleFieldChangeEvent,
}
