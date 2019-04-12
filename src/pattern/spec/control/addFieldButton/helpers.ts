import { ArrayedConstraint, ArrayedDomSpecValue, Configurations } from '@musical-patterns/spec'
import { Cardinal, isUndefined, Maybe, to, totalElements } from '@musical-patterns/utilities'
import { FieldButtonAttributes } from '../types'
import { ComputeAddFieldButtonAttributesParameters } from './types'

const computeMaxLength: (arrayedConstraint: Maybe<ArrayedConstraint>) => Maybe<Cardinal> =
    (arrayedConstraint: Maybe<ArrayedConstraint>): Maybe<Cardinal> =>
        !isUndefined(arrayedConstraint) && !isUndefined(arrayedConstraint.maxLength) ?
            to.Cardinal(arrayedConstraint.maxLength) :
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
        const maxLength: Maybe<Cardinal> =
            computeMaxLength(arrayedConstraint)
        const isAtMaxLength: boolean = !!maxLength && totalElements(displayedValue) >= maxLength
        const disabled: boolean = isAtMaxLength
        const title: string = disabled ? `This arrayed spec control has a maximum length of ${maxLength}.` : ''

        return { disabled, title }
    }

export {
    computeAddFieldButtonAttributes,
}
