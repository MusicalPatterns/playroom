import { Id } from '@musical-patterns/id'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

const computeOpenClassName: ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }) => string =
    ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }): string =>
        !isUndefined(pageName) || !isUndefined(patternId) ? 'open' : 'closed'

export {
    computeOpenClassName,
}
