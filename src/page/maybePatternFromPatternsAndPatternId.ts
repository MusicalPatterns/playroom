import { Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { GetPatternParameters } from './types'

const maybePatternFromPatternsAndPatternId: (postProps: GetPatternParameters) => Maybe<Pattern> =
    ({ patterns, patternId }: GetPatternParameters): Maybe<Pattern> =>
        patterns && patternId && patterns[ patternId ]

export {
    maybePatternFromPatternsAndPatternId,
}
