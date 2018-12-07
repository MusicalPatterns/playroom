import { setupPlayroom } from '../../../src'
import { patternsForTest } from './patternsForTest'

const playroom = setupPlayroom(patternsForTest)

document.body.appendChild(playroom)
