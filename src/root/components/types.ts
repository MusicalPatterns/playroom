import { Id, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'
import { PageName } from '../../pattern'

interface AppProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
    patterns: Maybe<Patterns>,
}

interface PropsFromApp {
    id: Id,
    patterns: Patterns,
}

interface PropsFromAppBeforeSelectingPattern {
    id?: Id,
    pageName?: PageName,
    patterns: Patterns,
}

interface FirstRowProps {
    id?: Id,
    pageName?: PageName,
}

type SecondRowProps = PropsFromAppBeforeSelectingPattern

interface PatternListenerPropsFromState {
    debugMode: boolean,
    submittedSpec: Spec,
}

interface PatternListenerPropsFromDispatch {
    setTotalDuration: (patternDuration: Ms) => void,
}

interface PatternListenerProps extends PatternListenerPropsFromState, PatternListenerPropsFromDispatch, PropsFromApp {}

interface SidePanelPropsFromState {
    sidePanelOpen: boolean,
}

interface SidePanelProps extends PropsFromAppBeforeSelectingPattern, SidePanelPropsFromState {}

interface PageProps {
    pageName: PageName,
}

export {
    AppProps,
    PatternListenerPropsFromState,
    PatternListenerPropsFromDispatch,
    PatternListenerProps,
    PropsFromApp,
    FirstRowProps,
    SecondRowProps,
    PropsFromAppBeforeSelectingPattern,
    SidePanelPropsFromState,
    SidePanelProps,
    PageProps,
}
