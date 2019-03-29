import { Id, Pattern, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { ComputeMaybePatternParameters } from './types'

const computeMaybePattern: (postProps: { patternId: Maybe<Id>, patterns: Maybe<Partial<Patterns>> }) => Maybe<Pattern> =
    ({ patterns, patternId }: ComputeMaybePatternParameters): Maybe<Pattern> =>
        patterns && patternId && patterns[ patternId ]

export {
    computeMaybePattern,
}
