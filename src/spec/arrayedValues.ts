import { ArrayedDomValue, ArrayedValue, DomSpec, DomValue, Spec, Value } from '@musical-patterns/pattern'
import { deepClone, isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDisplayedValue, isArrayedSubmittedValue } from './typeGuards'

const computeArrayedDisplayedValue: (displayedSpec: DomSpec, property: string) => ArrayedDomValue =
    (displayedSpec: DomSpec, property: string): ArrayedDomValue => {
        const maybeDisplayedValue: Maybe<DomValue> = deepClone(displayedSpec[ property ])
        if (isUndefined(maybeDisplayedValue)) {
            throw new Error('displayed value was undefined')
        }

        if (!isArrayedDisplayedValue(maybeDisplayedValue)) {
            throw new Error('displayed value was not arrayed')
        }

        return maybeDisplayedValue
    }

const computeArrayedSubmittedValue: (submittedSpec: Spec, property: string) => ArrayedValue =
    (submittedSpec: Spec, property: string): ArrayedValue => {
        const maybeSubmittedValue: Maybe<Value> = deepClone(submittedSpec[ property ])
        if (isUndefined(maybeSubmittedValue)) {
            throw new Error('submitted value was undefined')
        }

        if (!isArrayedSubmittedValue(maybeSubmittedValue)) {
            throw new Error('submitted value was not arrayed')
        }

        return maybeSubmittedValue
    }

export {
    computeArrayedSubmittedValue,
    computeArrayedDisplayedValue,
}
