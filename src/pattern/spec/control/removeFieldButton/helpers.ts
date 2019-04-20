import { ArrayedConstraint, ArrayedDomSpecValue, Configurations } from '@musical-patterns/spec'
import { as, Cardinal, isEmpty, isUndefined, length, Maybe } from '@musical-patterns/utilities'
import { FieldButtonAttributes } from '../types'
import { ComputeRemoveFieldButtonAttributesParameters } from './types'

const computeMinLength: (arrayedConstraint: Maybe<ArrayedConstraint>) => Maybe<Cardinal> =
    (arrayedConstraint: Maybe<ArrayedConstraint>): Maybe<Cardinal> =>
        !isUndefined(arrayedConstraint) && !isUndefined(arrayedConstraint.minLength) ?
            as.Cardinal(arrayedConstraint.minLength) :
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
        const minLength: Maybe<Cardinal> = computeMinLength(arrayedConstraint)
        const isAtMinLength: boolean = !!minLength && length(displayedValue) <= minLength
        const disabled: boolean = isEmpty(displayedValue) || isAtMinLength
        const title: string = isAtMinLength ? `This arrayed spec control has a minimum length of ${minLength}.` : ''

        return { disabled, title }
    }

export {
    computeRemoveFieldButtonAttributes,
}
