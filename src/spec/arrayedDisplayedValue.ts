import { ArrayedDomValue, DomSpec, DomValue } from '@musical-patterns/pattern'
import { deepClone, isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDisplayedValue } from './isArrayedDisplayedValue'

const computeArrayedDisplayedValue: (displayedSpec: DomSpec, property: string) => ArrayedDomValue =
    (displayedSpec: DomSpec, property: string): ArrayedDomValue => {
        const maybeDisplayedValue: Maybe<DomValue> = deepClone(displayedSpec[ property ])
        if (isUndefined(maybeDisplayedValue)) {
            throw new Error('spec value was undefined')
        }

        if (!isArrayedDisplayedValue(maybeDisplayedValue)) {
            throw new Error('spec value was not arrayed')
        }

        return maybeDisplayedValue
    }

export {
    computeArrayedDisplayedValue,
}
