import { ArrayedConstraint, ArrayedDomSpecValue, Configurations } from '@musical-patterns/spec'
import { as, Cardinal, computeLength, HtmlValueOrChecked, isUndefined, Maybe } from '@musical-patterns/utilities'
import { FieldButtonAttributes } from '../types'
import { ComputeAddFieldButtonAttributesParameters } from './types'

const computeMaxLength: (arrayedConstraint: Maybe<ArrayedConstraint>) => Maybe<Cardinal<HtmlValueOrChecked[]>> =
    (arrayedConstraint: Maybe<ArrayedConstraint>): Maybe<Cardinal<HtmlValueOrChecked[]>> =>
        !isUndefined(arrayedConstraint) && !isUndefined(arrayedConstraint.maxLength) ?
            as.Cardinal<HtmlValueOrChecked[]>(arrayedConstraint.maxLength) :
            undefined

const computeAddFieldButtonAttributes: (parameters: {
    configurations: Configurations,
    displayedValue: ArrayedDomSpecValue,
    specKey: string,
}) => FieldButtonAttributes =
    (
        {
            configurations,
            displayedValue,
            specKey,
        }: ComputeAddFieldButtonAttributesParameters,
    ): FieldButtonAttributes => {
        const arrayedConstraint: Maybe<ArrayedConstraint> = configurations[ specKey ].arrayedConstraint
        const maxLength: Maybe<Cardinal<HtmlValueOrChecked[]>> =
            computeMaxLength(arrayedConstraint)
        const isAtMaxLength: boolean = !isUndefined(maxLength) && computeLength(displayedValue) >= maxLength
        const disabled: boolean = isAtMaxLength
        const title: string = disabled ? `This arrayed spec control has a maximum length of ${String(maxLength)}.` : ''

        return { disabled, title }
    }

export {
    computeAddFieldButtonAttributes,
}
