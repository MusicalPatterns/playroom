import { Id } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

const getShowTitle: ({ id, pageName }: { id: Maybe<Id>, pageName: Maybe<PageName> }) => boolean =
    ({ id, pageName }: { id: Maybe<Id>, pageName: Maybe<PageName> }): boolean =>
        !isUndefined(pageName) || !isUndefined(id)

const getOpenClassName: ({ showTitle }: { showTitle: boolean }) => string =
    ({ showTitle }: { showTitle: boolean }): string =>
        showTitle ? 'open' : 'closed'

export {
    getShowTitle,
    getOpenClassName,
}
