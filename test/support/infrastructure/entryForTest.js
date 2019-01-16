import { otherPattern, pattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'

setupPlayroom({
    [ pattern.patternId ]: pattern,
    [ otherPattern.patternId ]: otherPattern,
    [ 3 ]: pattern,
    [ 4 ]: pattern,
    [ 5 ]: pattern,
    [ 6 ]: pattern,
    [ 7 ]: pattern,
    [ 8 ]: pattern,
    [ 9 ]: pattern,
    [ 10 ]: pattern,
    [ 11 ]: pattern,
}).then(playroom => document.body.appendChild(playroom))
