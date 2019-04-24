import { Id } from '@musical-patterns/id'
import { Patterns } from '@musical-patterns/pattern'
import { Specs } from '@musical-patterns/spec'
import { Maybe, Ms, Translation } from '@musical-patterns/utilities'

interface RecompileListenerPropsFromState {
    debugMode: boolean,
    patternId: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    submittedSpecs: Specs,
}

interface RecompileListenerPropsFromDispatch {
    setPatternDuration: (patternDuration: Translation<Ms>) => void,
}

interface RecompileListenerProps extends RecompileListenerPropsFromState,
    RecompileListenerPropsFromDispatch {}

export {
    RecompileListenerPropsFromDispatch,
    RecompileListenerPropsFromState,
    RecompileListenerProps,
}
