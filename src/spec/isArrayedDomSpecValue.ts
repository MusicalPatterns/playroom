import { ArrayedDomSpecValue, DomSpecValue } from '@musical-patterns/pattern'

const isArrayedDomSpecValue: (specValue: DomSpecValue) => specValue is ArrayedDomSpecValue =
    (specValue: DomSpecValue): specValue is ArrayedDomSpecValue =>
        specValue instanceof Array

export {
    isArrayedDomSpecValue,
}
