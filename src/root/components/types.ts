import { PatternId, Patterns } from '@musical-patterns/registry'
import { Maybe, Time } from '@musical-patterns/utilities'
import { StringifiedPatternSpec } from '../../patternSpec'

interface AppProps {
    patternId: Maybe<PatternId>,
    patterns: Maybe<Patterns>,
}

interface PatternListenerPropsFromState {
    debugMode: boolean,
    submittedPatternSpec: StringifiedPatternSpec,
}

interface PatternListenerPropsFromDispatch {
    setTotalDuration: (totalDuration: Time) => void,
}

interface PatternListenerPropsFromParent {
    patternId: PatternId,
    patterns: Patterns,
}

interface PatternListenerProps extends PatternListenerPropsFromState,
    PatternListenerPropsFromDispatch,
    PatternListenerPropsFromParent {}

export {
    AppProps,
    PatternListenerPropsFromState,
    PatternListenerPropsFromDispatch,
    PatternListenerProps,
}
