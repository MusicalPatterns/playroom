import { pattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'

setupPlayroom({
    [ pattern.id ]: pattern,
}).then(playroom => document.body.appendChild(playroom))
