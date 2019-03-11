import {
    ArrayedDomSpecValue,
    ArrayedValidation,
    ArrayedValue,
    DomSpecs,
    DomSpecValue,
    Specs,
    SpecValue,
    Validation,
    Validations,
} from '@musical-patterns/pattern'
import { deepClone, isUndefined, Maybe } from '@musical-patterns/utilities'
import { isArrayedDisplayedValue, isArrayedSubmittedValue, isArrayedValidation } from './typeGuards'

const computeArrayedDisplayedValue: (displayedSpecs: DomSpecs, specKey: string) => ArrayedDomSpecValue =
    (displayedSpecs: DomSpecs, specKey: string): ArrayedDomSpecValue => {
        const maybeDisplayedValue: Maybe<DomSpecValue> = deepClone(displayedSpecs[ specKey ])
        if (isUndefined(maybeDisplayedValue)) {
            throw new Error('displayed value was undefined')
        }

        if (!isArrayedDisplayedValue(maybeDisplayedValue)) {
            throw new Error('displayed value was not arrayed')
        }

        return maybeDisplayedValue
    }

const computeArrayedSubmittedValue: (submittedSpecs: Specs, specKey: string) => ArrayedValue =
    (submittedSpecs: Specs, specKey: string): ArrayedValue => {
        const maybeSubmittedValue: Maybe<SpecValue> = deepClone(submittedSpecs[ specKey ])
        if (isUndefined(maybeSubmittedValue)) {
            throw new Error('submitted value was undefined')
        }

        if (!isArrayedSubmittedValue(maybeSubmittedValue)) {
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
