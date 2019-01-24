import { SpecAttributes } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, Maybe } from '@musical-patterns/utilities'

const buildSortSpecControls: (specAttributes: SpecAttributes) => (specKey: string, nextSpecKey: string) => number =
    (specAttributes: SpecAttributes): (specKey: string, nextSpecKey: string) => number =>
        (specKey: string, nextSpecKey: string): number => {
            const order: Maybe<number> = specAttributes[ specKey ].order
            const sortOrder: number = order === undefined ? ARBITRARILY_LARGE_NUMBER : order

            const nextOrder: Maybe<number> = specAttributes[ nextSpecKey ].order
            const nextSortOrder: number = nextOrder === undefined ? ARBITRARILY_LARGE_NUMBER : nextOrder

            return sortOrder < nextSortOrder ? -1 : 1
        }

export {
    buildSortSpecControls,
}
