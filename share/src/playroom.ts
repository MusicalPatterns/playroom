import { setupPlayroom } from '@musical-patterns/playroom'
import { buildPatterns, Patterns } from '@musical-patterns/registry'
import { pattern, patterns } from './patterns'

let patternsForPlayroom: Patterns

if (!patterns) {
    patternsForPlayroom = buildPatterns({
        [ pattern.patternId ]: pattern,
    })
}
else {
    patternsForPlayroom = patterns
}

const debugMode: boolean = process.env.NODE_ENV === 'development'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
