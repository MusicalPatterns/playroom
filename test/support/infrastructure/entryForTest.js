import { pattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'
import { otherPattern } from '../otherPattern'

setupPlayroom({
    [ pattern.patternId ]: pattern,
    [ otherPattern.patternId ]: otherPattern,
    [ 3 ]: otherPattern,
    [ 4 ]: otherPattern,
    [ 5 ]: otherPattern,
    [ 6 ]: otherPattern,
    [ 7 ]: otherPattern,
    [ 8 ]: otherPattern,
    [ 9 ]: otherPattern,
    [ 10 ]: otherPattern,
    [ 11 ]: otherPattern,
}).then(playroom => document.body.appendChild(playroom))
