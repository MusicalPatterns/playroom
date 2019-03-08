import { ArrayedDomValue, ArrayedValue } from '@musical-patterns/pattern'
import { from } from '@musical-patterns/utilities'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import { MergeEventValueIntoValueParameters } from './types'

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

export {
    mergeEventValueIntoArrayedValue,
}
