import { SpecAttributes } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, isUndefined, Maybe, negative } from '@musical-patterns/utilities'

const buildSortSpecControls: (specAttributes: SpecAttributes) => (specKey: string, nextSpecKey: string) => number =
    (specAttributes: SpecAttributes): (specKey: string, nextSpecKey: string) => number =>
        (specKey: string, nextSpecKey: string): number => {
            const order: Maybe<number> = specAttributes[ specKey ].order
            const sortOrder: number = isUndefined(order) ? ARBITRARILY_LARGE_NUMBER : order

            const nextOrder: Maybe<number> = specAttributes[ nextSpecKey ].order
            const nextSortOrder: number = isUndefined(nextOrder) ? ARBITRARILY_LARGE_NUMBER : nextOrder

            return sortOrder < nextSortOrder ? negative(1) : 1
        }

export {
    buildSortSpecControls,
}
