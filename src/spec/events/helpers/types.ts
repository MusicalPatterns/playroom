import { DomSpec } from '@musical-patterns/pattern'
import { DomValueOrChecked, Ordinal } from '@musical-patterns/utilities'

interface MergeEventValueIntoSpecValueParameters {
    arrayedPropertyIndex: Ordinal,
    displayedSpec: DomSpec,
    eventValue: DomValueOrChecked,
    specKey: string,
}

export {
    MergeEventValueIntoSpecValueParameters,
}
