import { Spec } from '@musical-patterns/pattern'
import { Id, Patterns } from '@musical-patterns/registry'
import { Maybe, Time } from '@musical-patterns/utilities'

interface AppProps {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
}

interface PropsFromApp {
    id: Id,
    patterns: Patterns,
}

interface PropsFromAppBeforeSelectingPattern {
    id?: Id,
    patterns: Patterns,
}

interface FirstRowProps {
    id?: Id,
}

type SecondRowProps = PropsFromAppBeforeSelectingPattern

interface PatternListenerPropsFromState {
    debugMode: boolean,
    submittedSpec: Spec,
}

interface PatternListenerPropsFromDispatch {
    setTotalDuration: (totalDuration: Time) => void,
}

interface PatternListenerProps extends PatternListenerPropsFromState, PatternListenerPropsFromDispatch, PropsFromApp {}

export {
    AppProps,
    PatternListenerPropsFromState,
    PatternListenerPropsFromDispatch,
    PatternListenerProps,
    PropsFromApp,
    FirstRowProps,
    SecondRowProps,
    PropsFromAppBeforeSelectingPattern,
}
