import { playroomTestPattern } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'

setupPlayroom({
    [ playroomTestPattern.id ]: playroomTestPattern,
}).then(playroom => document.body.appendChild(playroom))
