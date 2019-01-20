import { AnyPatternSpec } from '@musical-patterns/pattern'
import { PatternId, Patterns } from '@musical-patterns/registry'
import { Maybe, Time } from '@musical-patterns/utilities'

interface AppProps {
    patternId: Maybe<PatternId>,
    patterns: Maybe<Patterns>,
}

interface PropsFromApp {
    patternId: PatternId,
    patterns: Patterns,
}

interface PropsFromAppBeforeSelectingPattern {
    patternId?: PatternId,
    patterns: Patterns,
}

interface FirstRowProps {
    patternId?: PatternId,
}

type SecondRowProps = PropsFromAppBeforeSelectingPattern

interface PatternListenerPropsFromState {
    debugMode: boolean,
    submittedPatternSpec: AnyPatternSpec,
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
