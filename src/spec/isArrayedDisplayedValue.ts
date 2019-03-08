import { ArrayedDomValue, DomValue } from '@musical-patterns/pattern'

const isArrayedDisplayedValue: (displayedValue: DomValue) => displayedValue is ArrayedDomValue =
    (displayedValue: DomValue): displayedValue is ArrayedDomValue =>
        displayedValue instanceof Array

export {
    isArrayedDisplayedValue,
}
