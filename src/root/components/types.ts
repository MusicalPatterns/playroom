import { PatternId, Patterns } from '@musical-patterns/registry'
import { Maybe, Time } from '@musical-patterns/utilities'
import { StringifiedPatternSpec } from '../../patternSpec'

interface AppProps {
    patternId: Maybe<PatternId>,
    patterns: Maybe<Patterns>,
}

interface PropsFromApp {
    patternId: PatternId,
    patterns: Patterns,
}

interface FirstRowProps {
    patternId?: PatternId,
}

interface SecondRowProps {
    patternId?: PatternId,
    patterns: Patterns,
}

interface PatternListenerPropsFromState {
    debugMode: boolean,
    submittedPatternSpec: StringifiedPatternSpec,
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
}
