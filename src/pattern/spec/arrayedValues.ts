import {
    ArrayedDomSpecValue,
    ArrayedSpecValue,
    ArrayedValidation,
    DomSpecs,
    DomSpecValue,
    isArrayedDomSpecValue,
    isArrayedSpecValue,
    isArrayedValidation,
    Specs,
    SpecValue,
    Validation,
    Validations,
} from '@musical-patterns/pattern'
import { deepClone, isUndefined, Maybe } from '@musical-patterns/utilities'

const computeArrayedDisplayedValue: (displayedSpecs: DomSpecs, specKey: string) => ArrayedDomSpecValue =
    (displayedSpecs: DomSpecs, specKey: string): ArrayedDomSpecValue => {
        const maybeDisplayedValue: Maybe<DomSpecValue> = deepClone(displayedSpecs[ specKey ])
        if (isUndefined(maybeDisplayedValue)) {
            throw new Error('displayed value was undefined')
        }

        if (!isArrayedDomSpecValue(maybeDisplayedValue)) {
            throw new Error('displayed value was not arrayed')
        }

        return maybeDisplayedValue
    }

const computeArrayedSubmittedValue: (submittedSpecs: Specs, specKey: string) => ArrayedSpecValue =
    (submittedSpecs: Specs, specKey: string): ArrayedSpecValue => {
        const maybeSubmittedValue: Maybe<SpecValue> = deepClone(submittedSpecs[ specKey ])
        if (isUndefined(maybeSubmittedValue)) {
            throw new Error('submitted value was undefined')
        }

        if (!isArrayedSpecValue(maybeSubmittedValue)) {
            throw new Error('submitted value was not arrayed')
        }

        return maybeSubmittedValue
    }

const computeArrayedValidation: (validations: Validations, specKey: string) => ArrayedValidation =
    (validations: Validations, specKey: string): ArrayedValidation => {
        const validation: Validation = validations && validations[ specKey ]

        if (!isArrayedValidation(validation)) {
            throw new Error('cannot treat a singular validation as arrayed')
        }

        return validation
    }

export {
    computeArrayedSubmittedValue,
    computeArrayedDisplayedValue,
    computeArrayedValidation,
}
