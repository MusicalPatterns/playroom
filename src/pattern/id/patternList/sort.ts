import { Pattern } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, isUndefined, negative } from '@musical-patterns/utilities'

const sortByOrder: (pattern: Pattern, nextPattern: Pattern) => number =
    (pattern: Pattern, nextPattern: Pattern): number => {
        const first: number =
            isUndefined(pattern.metadata.order) ? ARBITRARILY_LARGE_NUMBER : pattern.metadata.order
        const second: number =
            isUndefined(nextPattern.metadata.order) ? ARBITRARILY_LARGE_NUMBER : nextPattern.metadata.order

        if (first < second) {
            return negative(1)
        }
        else if (first > second) {
            return 1
        }
        else {
            return 0
        }
    }

const sortByPublishDate: (pattern: Pattern, nextPattern: Pattern) => number =
    (pattern: Pattern, nextPattern: Pattern): number => {
        if (pattern.metadata.originalPublish < nextPattern.metadata.originalPublish) {
            return 1
        }
        if (pattern.metadata.originalPublish > nextPattern.metadata.originalPublish) {
            return negative(1)
        }

        return 0
    }

const sortByOrderOrPublishDate: (entry: [ string, Pattern ], nextEntry: [ string, Pattern ]) => number =
    ([ _, pattern ]: [ string, Pattern ], [ __, nextPattern ]: [ string, Pattern ]): number =>
        sortByOrder(pattern, nextPattern) || sortByPublishDate(pattern, nextPattern)

export {
    sortByOrderOrPublishDate,
}
