// @ts-ignore
// tslint:disable:no-implicit-dependencies
import { setupPlayroom } from '@musical-patterns/playroom'
import { buildPatterns, Patterns } from '@musical-patterns/registry'
// @ts-ignore
import { pattern } from './patterns'

const patterns: Patterns = buildPatterns({
    // tslint:disable-next-line:no-unsafe-any
    [ pattern.patternId ]: pattern,
})

// tslint:disable-next-line:no-unsafe-any
setupPlayroom(patterns)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
