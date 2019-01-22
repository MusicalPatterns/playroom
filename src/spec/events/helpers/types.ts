import { Spec } from '@musical-patterns/pattern'
import { Index } from '@musical-patterns/utilities'
import { DomValueOrChecked } from '../../../types'

interface MergeEventValueIntoSpecValueParameters {
    arrayedPropertyIndex: Index,
    displayedSpec: Spec,
    eventValue: DomValueOrChecked,
    specKey: string,
}

export {
    MergeEventValueIntoSpecValueParameters,
}
