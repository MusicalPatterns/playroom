import { ArrayedDomSpecValue, DomSpec, DomSpecValue } from '@musical-patterns/pattern'
import { deepClone, Maybe } from '@musical-patterns/utilities'

const getArrayedDomSpecValue: (displayedSpec: DomSpec, specKey: string) => ArrayedDomSpecValue =
    (displayedSpec: DomSpec, specKey: string): ArrayedDomSpecValue => {
        const maybeDomSpecValue: Maybe<DomSpecValue> = deepClone(displayedSpec[ specKey ])
        if (maybeDomSpecValue === undefined) {
            throw new Error('spec value was undefined')
        }

        return maybeDomSpecValue as ArrayedDomSpecValue
    }

export {
    getArrayedDomSpecValue,
}
