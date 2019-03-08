import { Metadata, Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { maybePatternFromPatternsAndId } from '../../maybePatternFromPatternsAndId'
import { GetPatternParameters } from '../../types'

const getPost: (postProps: GetPatternParameters) => string =
    ({ patterns, id }: GetPatternParameters): string => {
        const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })
        const metadata: Maybe<Metadata> = pattern && pattern.metadata
        const description: Maybe<string> = metadata && metadata.description

        return description || ''
    }

export {
    getPost,
}
