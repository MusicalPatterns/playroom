import { ArrayedDomSpecValue, ArrayedValue, SpecValue } from '@musical-patterns/pattern'
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
        const { displayedSpecs, specKey, fieldIndex, eventValue } = parameters

        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)

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
                specKey,
                displayedSpecs,
                submittedSpecs,
                computeValidations,
                configurations,
            } = parameters

            const eventValue: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)

            let updatedValue: SpecValue = eventValue
            if (!isUndefined(fieldIndex)) {
                updatedValue = mergeEventValueIntoArrayedValue({
                    displayedSpecs,
                    eventValue,
                    fieldIndex,
                    specKey,
                })
            }

            const actions: Action[] = computeAttemptSubmitActions({
                computeValidations,
                configurations,
                displayedSpecs,
                specKey,
                submittedSpecs,
                updatedValue,
            })

            dispatch(batchActions(actions))
        }

export {
    computeHandleFieldChangeEvent,
}
