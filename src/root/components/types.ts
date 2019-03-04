import { Id, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'
import { PageName } from '../../leftColumn'

interface AppProps {
    patterns: Maybe<Patterns>,
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
    patterns: Maybe<Patterns>,
}

interface PatternListenerPropsFromState {
    debugMode: boolean,
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
    submittedSpec: Spec,
}

interface PatternListenerPropsFromDispatch {
    setTotalDuration: (patternDuration: Ms) => void,
}

interface PatternListenerProps extends PatternListenerPropsFromState, PatternListenerPropsFromDispatch {}

interface PageProps {
    pageName: Maybe<PageName>,
}

interface PostProps {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
}

export {
    AppProps,
    PatternListenerPropsFromState,
    PatternListenerPropsFromDispatch,
    PatternListenerProps,
    FirstRowProps,
    SecondRowProps,
    PageProps,
    MiddlePlusRightColumnsProps,
    PostProps,
}
