// tslint:disable-next-line:no-implicit-dependencies
import { compilePattern } from '@musical-patterns/compiler'
import { logMessageToConsole } from '@musical-patterns/utilities'

describe('snapshot', () => {
    it('stays locked down', async (done: DoneFn) => {
        // tslint:disable-next-line:no-unsafe-any no-require-imports
        const { pattern, snapshot } = require('../src/indexForTest')

        if (!pattern) {
            logMessageToConsole('This snapshot test is running outside of a pattern\'s test suite. Harmless.')
            done()

            return
        }

        // tslint:disable-next-line:no-unsafe-any
        expect(JSON.stringify(await compilePattern(pattern), undefined, 2))
            .toEqual(JSON.stringify(snapshot, undefined, 2))

        done()
    })
})
