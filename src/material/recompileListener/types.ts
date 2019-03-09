import { Id, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'

interface RecompileListenerPropsFromState {
    debugMode: boolean,
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    submittedSpec: Spec,
}

interface RecompileListenerPropsFromDispatch {
    setPatternDuration: (patternDuration: Ms) => void,
}

interface RecompileListenerProps extends RecompileListenerPropsFromState,
    RecompileListenerPropsFromDispatch {}

export {
    RecompileListenerPropsFromDispatch,
    RecompileListenerPropsFromState,
    RecompileListenerProps,
}
