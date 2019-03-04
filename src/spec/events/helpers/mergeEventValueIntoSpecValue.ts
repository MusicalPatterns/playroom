import { deepClone, from } from '@musical-patterns/utilities'
import { DomValueOrChecked } from '../../../types'
import { MergeEventValueIntoSpecValueParameters } from './types'

const mergeEventValueIntoSpecValue: (parameters: MergeEventValueIntoSpecValueParameters) => DomValueOrChecked[] =
    (parameters: MergeEventValueIntoSpecValueParameters): DomValueOrChecked[] => {
        const { displayedSpec, specKey, arrayedPropertyIndex, eventValue } = parameters

        const specValue: DomValueOrChecked[] = deepClone(displayedSpec[ specKey ]) as DomValueOrChecked[]

        while (specValue.length < from.Ordinal(arrayedPropertyIndex)) {
            specValue.push('')
        }
        specValue[ from.Ordinal(arrayedPropertyIndex) ] = eventValue

        return specValue
    }

export {
    mergeEventValueIntoSpecValue,
}
