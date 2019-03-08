import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

interface PostProps {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
}

export {
    PostProps,
}
