import { Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { GetPatternParameters } from './types'

const maybePatternFromPatternsAndId: (postProps: GetPatternParameters) => Maybe<Pattern> =
    ({ patterns, id }: GetPatternParameters): Maybe<Pattern> =>
        patterns && id && patterns[ id ]

export {
    maybePatternFromPatternsAndId,
}
