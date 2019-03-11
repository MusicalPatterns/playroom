import { Attributes } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, isUndefined, Maybe, negative } from '@musical-patterns/utilities'

const computeSortSpecControls: (attributes: Attributes) => (property: string, nextProperty: string) => number =
    (attributes: Attributes): (property: string, nextProperty: string) => number =>
        (property: string, nextProperty: string): number => {
            const order: Maybe<number> = attributes[ property ].order
            const sortOrder: number = isUndefined(order) ? ARBITRARILY_LARGE_NUMBER : order

            const nextOrder: Maybe<number> = attributes[ nextProperty ].order
            const nextSortOrder: number = isUndefined(nextOrder) ? ARBITRARILY_LARGE_NUMBER : nextOrder

            return sortOrder < nextSortOrder ? negative(1) : 1
        }

export {
    computeSortSpecControls,
}
