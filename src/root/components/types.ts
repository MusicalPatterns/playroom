import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../page'

interface AppProps {
    patterns: Maybe<Patterns>,
}

interface LeftColumnProps {
    leftColumnOpen: boolean,
}

interface MiddlePlusRightColumnsProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
    rightColumnOpen: boolean,
}

interface FirstRowProps {
    pageName: Maybe<PageName>,
}

interface SecondRowProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
}

export {
    AppProps,
    FirstRowProps,
    SecondRowProps,
    LeftColumnProps,
    MiddlePlusRightColumnsProps,
}
