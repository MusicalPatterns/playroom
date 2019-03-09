import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

interface TitleProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
    patterns: Maybe<Partial<Patterns>>,
}

export {
    TitleProps,
}
