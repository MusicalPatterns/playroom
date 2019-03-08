import { Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'

interface AppProps {
    patterns: Maybe<Partial<Patterns>>,
}

export {
    AppProps,
}
