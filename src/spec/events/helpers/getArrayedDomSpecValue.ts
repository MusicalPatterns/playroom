import { ArrayedDomSpecValue, DomSpec, DomSpecValue } from '@musical-patterns/pattern'
import { deepClone, isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDomSpecValue } from '../../components'

const getArrayedDomSpecValue: (displayedSpec: DomSpec, specKey: string) => ArrayedDomSpecValue =
    (displayedSpec: DomSpec, specKey: string): ArrayedDomSpecValue => {
        const maybeDomSpecValue: Maybe<DomSpecValue> = deepClone(displayedSpec[ specKey ])
        if (isUndefined(maybeDomSpecValue)) {
            throw new Error('spec value was undefined')
        }

        if (!isArrayedDomSpecValue(maybeDomSpecValue)) {
            throw new Error('spec value was not arrayed')
        }

        return maybeDomSpecValue
    }

export {
    getArrayedDomSpecValue,
}
