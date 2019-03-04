import { Metadata, Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PostProps } from '../types'
import { maybePatternFromPatternsAndId } from './maybePatternFromPatternsAndId'

const getPost: (postProps: PostProps) => string =
    ({ patterns, id }: PostProps): string => {
        const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })
        const metadata: Maybe<Metadata> = pattern && pattern.metadata
        const description: Maybe<string> = metadata && metadata.description

        return description || ''
    }

export {
    getPost,
}
