import { PatternId, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { StringifiedPatternSpec } from '../../patternSpec'

interface AppProps {
    patternId: Maybe<PatternId>,
    patterns: Maybe<Patterns>,
}

interface PatternListenerPropsFromState {
    submittedPatternSpec: StringifiedPatternSpec,
}

interface PatternListenerPropsFromParent {
    patternId: PatternId,
    patterns: Patterns,
}

interface PatternListenerProps extends PatternListenerPropsFromState, PatternListenerPropsFromParent {
}

export {
    AppProps,
    PatternListenerPropsFromState,
    PatternListenerProps,
}
