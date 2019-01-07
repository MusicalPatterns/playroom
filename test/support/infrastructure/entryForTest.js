import { pattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'

setupPlayroom({
    [ pattern.patternId ]: pattern,
}).then(playroom => document.body.appendChild(playroom))
