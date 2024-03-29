import { ArrayedConstraint, ArrayedDomSpecValue, Configurations } from '@musical-patterns/spec'
import {
    as,
    Cardinal,
    computeLength,
    HtmlValueOrChecked,
    isEmpty,
    isUndefined,
    Maybe,
} from '@musical-patterns/utilities'
import { FieldButtonAttributes } from '../types'
import { ComputeRemoveFieldButtonAttributesParameters } from './types'

const computeMinLength: (arrayedConstraint: Maybe<ArrayedConstraint>) => Maybe<Cardinal<HtmlValueOrChecked[]>> =
    (arrayedConstraint: Maybe<ArrayedConstraint>): Maybe<Cardinal<HtmlValueOrChecked[]>> =>
        !isUndefined(arrayedConstraint) && !isUndefined(arrayedConstraint.minLength) ?
            as.Cardinal<HtmlValueOrChecked[]>(arrayedConstraint.minLength) :
            undefined

const computeRemoveFieldButtonAttributes: (parameters: {
    configurations: Configurations,
    displayedValue: ArrayedDomSpecValue,
    specKey: string,
}) => FieldButtonAttributes =
    (
        {
            configurations,
            displayedValue,
            specKey,
        }: ComputeRemoveFieldButtonAttributesParameters,
    ): FieldButtonAttributes => {
        const arrayedConstraint: Maybe<ArrayedConstraint> = configurations[ specKey ].arrayedConstraint
        const minLength: Maybe<Cardinal<HtmlValueOrChecked[]>> = computeMinLength(arrayedConstraint)
        const isAtMinLength: boolean = !isUndefined(minLength) && computeLength(displayedValue) <= minLength
        const disabled: boolean = isEmpty(displayedValue) || isAtMinLength
        const title: string = isAtMinLength ?
            `This arrayed spec control has a minimum length of ${String(minLength)}.` :
            ''

        return { disabled, title }
    }

export {
    computeRemoveFieldButtonAttributes,
}
