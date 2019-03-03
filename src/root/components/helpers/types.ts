import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

interface GetPatternTitleParameters {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>
}

export {
    GetPatternTitleParameters,
}
