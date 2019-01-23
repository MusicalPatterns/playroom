import { deepClone, from } from '@musical-patterns/utilities'
import { DomValueOrChecked } from '../../../types'
import { MergeEventValueIntoSpecValueParameters } from './types'

const mergeEventValueIntoSpecValue: (parameters: MergeEventValueIntoSpecValueParameters) => DomValueOrChecked[] =
    (parameters: MergeEventValueIntoSpecValueParameters): DomValueOrChecked[] => {
        const { displayedSpec, specKey, arrayedPropertyIndex, eventValue } = parameters

        // tslint:disable-next-line:no-unsafe-any
        const specValue: DomValueOrChecked[] = deepClone(displayedSpec[ specKey ]) as DomValueOrChecked[]

        while (specValue.length < from.Index(arrayedPropertyIndex)) {
            specValue.push('')
        }
        specValue[ from.Index(arrayedPropertyIndex) ] = eventValue

        return specValue
    }

export {
    mergeEventValueIntoSpecValue,
}