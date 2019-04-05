import { ArrayedConstraint, ArrayedDomSpecValue, Configurations } from '@musical-patterns/pattern'
import { isEmpty, isUndefined, Maybe, totalElements } from '@musical-patterns/utilities'
import { ComputeRemoveFieldButtonAttributesParameters, RemoveFieldButtonAttributes } from './types'

const computeRemoveFieldButtonAttributes: (parameters: {
    configurations: Configurations,
    displayedValue: ArrayedDomSpecValue,
    specKey: string,
}) => RemoveFieldButtonAttributes =
    (
        {
            configurations,
            displayedValue,
            specKey,
        }: ComputeRemoveFieldButtonAttributesParameters,
    ): RemoveFieldButtonAttributes => {
        const arrayedConstraint: Maybe<ArrayedConstraint> = configurations[ specKey ].arrayedConstraint
        const minLength: Maybe<number> = !isUndefined(arrayedConstraint) ? arrayedConstraint.minLength : undefined
        const isAtMinLength: boolean = !!minLength && totalElements(displayedValue) <= minLength
        const disabled: boolean = isEmpty(displayedValue) || isAtMinLength
        const title: string = isAtMinLength ? `This arrayed spec control has a minimum length of ${minLength}.` : ''

        return { disabled, title }
    }

export {
    computeRemoveFieldButtonAttributes,
}
