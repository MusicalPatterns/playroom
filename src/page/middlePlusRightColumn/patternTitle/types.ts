import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

interface PatternTitleProps {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
}

export {
    PatternTitleProps,
}
