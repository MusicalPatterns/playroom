import { Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PostProps } from '../types'

const maybePatternFromPatternsAndId: (postProps: PostProps) => Maybe<Pattern> =
    ({ patterns, id }: PostProps): Maybe<Pattern> =>
        patterns && id && patterns[ id ]

export {
    maybePatternFromPatternsAndId,
}
