import { ArrayedDomValue, ArrayedValue } from '@musical-patterns/pattern'
import { from } from '@musical-patterns/utilities'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import { MergeEventValueIntoValueParameters } from './types'

const mergeEventValueIntoArrayedValue: (parameters: MergeEventValueIntoValueParameters) => ArrayedValue =
    (parameters: MergeEventValueIntoValueParameters): ArrayedValue => {
        const { displayedSpec, property, arrayedFieldIndex, eventValue } = parameters

        const arrayedDisplayedValue: ArrayedDomValue = getArrayedDisplayedValue(displayedSpec, property)

        while (arrayedDisplayedValue.length < from.Ordinal(arrayedFieldIndex)) {
            arrayedDisplayedValue.push('')
        }
        arrayedDisplayedValue[ from.Ordinal(arrayedFieldIndex) ] = eventValue

        return arrayedDisplayedValue
    }

export {
    mergeEventValueIntoArrayedValue,
}
