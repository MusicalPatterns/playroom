import { pattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'
import { otherPattern } from '../otherPattern'

setupPlayroom({
    [ pattern.patternId ]: pattern,
    [ otherPattern.patternId ]: otherPattern,
}).then(playroom => document.body.appendChild(playroom))
