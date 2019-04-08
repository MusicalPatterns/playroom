import { OptionedConstraintOption } from '@musical-patterns/spec'
import { ARBITRARILY_LARGE_NUMBER, isUndefined, negative } from '@musical-patterns/utilities'

const sortOptions: (option: OptionedConstraintOption, nextOption: OptionedConstraintOption) => number =
    (option: OptionedConstraintOption, nextOption: OptionedConstraintOption): number => {
        const order: number = isUndefined(option.order) ? ARBITRARILY_LARGE_NUMBER : option.order
        const nextOrder: number = isUndefined(nextOption.order) ?
            ARBITRARILY_LARGE_NUMBER :
            nextOption.order

        return order < nextOrder ? negative(1) : 1
    }

export {
    sortOptions,
}
