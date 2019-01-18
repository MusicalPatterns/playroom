import { patterns } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from '../../../src'

setupPlayroom(patterns)
    .then(playroom => document.body.appendChild(playroom))
