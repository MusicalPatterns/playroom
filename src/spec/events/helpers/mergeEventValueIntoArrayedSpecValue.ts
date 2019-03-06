import { ArrayedDomSpecValue, ArrayedSpecValue } from '@musical-patterns/pattern'
import { from } from '@musical-patterns/utilities'
import { getArrayedDomSpecValue } from './getArrayedDomSpecValue'
import { MergeEventValueIntoSpecValueParameters } from './types'

const mergeEventValueIntoArrayedSpecValue: (parameters: MergeEventValueIntoSpecValueParameters) => ArrayedSpecValue =
    (parameters: MergeEventValueIntoSpecValueParameters): ArrayedSpecValue => {
        const { displayedSpec, specKey, arrayedPropertyIndex, eventValue } = parameters

        const arrayedSpecValue: ArrayedDomSpecValue = getArrayedDomSpecValue(displayedSpec, specKey)

        while (arrayedSpecValue.length < from.Ordinal(arrayedPropertyIndex)) {
            arrayedSpecValue.push('')
        }
        arrayedSpecValue[ from.Ordinal(arrayedPropertyIndex) ] = eventValue

        return arrayedSpecValue
    }

export {
    mergeEventValueIntoArrayedSpecValue,
}
