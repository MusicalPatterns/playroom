import { Id } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

const getOpenClassName: ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }) => string =
    ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }): string =>
        !isUndefined(pageName) || !isUndefined(patternId) ? 'open' : 'closed'

export {
    getOpenClassName,
}
