import { Id, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'

interface SpecAndPatternListenerPropsFromState {
    debugMode: boolean,
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    submittedSpec: Spec,
}

interface SpecAndPatternListenerPropsFromDispatch {
    setPatternDuration: (patternDuration: Ms) => void,
}

interface SpecAndPatternListenerProps extends SpecAndPatternListenerPropsFromState,
    SpecAndPatternListenerPropsFromDispatch {}

export {
    SpecAndPatternListenerPropsFromDispatch,
    SpecAndPatternListenerPropsFromState,
    SpecAndPatternListenerProps,
}
