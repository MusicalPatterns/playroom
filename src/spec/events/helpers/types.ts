import { Spec } from '@musical-patterns/pattern'
import { Ordinal } from '@musical-patterns/utilities'
import { DomValueOrChecked } from '../../../types'

interface MergeEventValueIntoSpecValueParameters {
    arrayedPropertyIndex: Ordinal,
    displayedSpec: Spec,
    eventValue: DomValueOrChecked,
    specKey: string,
}

export {
    MergeEventValueIntoSpecValueParameters,
}
