import { setupPlayroom } from '@musical-patterns/playroom'
import { buildPatterns, Patterns } from '@musical-patterns/registry'
import { pattern } from './patterns'

const patterns: Patterns = buildPatterns({
    [ pattern.patternId ]: pattern,
})

setupPlayroom(patterns)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
