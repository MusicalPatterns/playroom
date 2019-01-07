import { pattern as playroomTest } from '@musical-patterns/pattern-playroom-test'
import { pattern as performerQa } from '@musical-patterns/pattern-performer-qa'
import { setupPlayroom } from '../../src'

setupPlayroom({
    [ playroomTest.patternId ]: playroomTest,
    [ performerQa.patternId ]: performerQa,
}).then(playroom => document.body.appendChild(playroom))
