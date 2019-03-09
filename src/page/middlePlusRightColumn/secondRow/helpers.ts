import { Id } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

const getShowTitle: ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }) => boolean =
    ({ patternId, pageName }: { pageName: Maybe<PageName>, patternId: Maybe<Id> }): boolean =>
        !isUndefined(pageName) || !isUndefined(patternId)

const getOpenClassName: ({ showTitle }: { showTitle: boolean }) => string =
    ({ showTitle }: { showTitle: boolean }): string =>
        showTitle ? 'open' : 'closed'

export {
    getShowTitle,
    getOpenClassName,
}
