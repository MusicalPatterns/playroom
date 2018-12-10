import { setupPlayroom } from '../../../src'
import { patternsForTest } from './patternsForTest'

setupPlayroom(patternsForTest).then(playroom => document.body.appendChild(playroom))
