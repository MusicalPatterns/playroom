import { Id, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'
import { Page } from '../../pattern'

interface AppProps {
    id: Maybe<Id>,
    page: Maybe<Page>,
    patterns: Maybe<Patterns>,
}

interface PropsFromApp {
    id: Id,
    patterns: Patterns,
}

interface PropsFromAppBeforeSelectingPattern {
    id?: Id,
    page?: Page,
    patterns: Patterns,
}

interface FirstRowProps {
    id?: Id,
    page?: Page,
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
    page: Page,
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
