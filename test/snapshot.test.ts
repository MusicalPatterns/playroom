// tslint:disable-next-line:no-implicit-dependencies
import { compilePattern } from '@musical-patterns/compiler'
import * as path from 'path'

describe('snapshot', () => {
    // tslint:disable-next-line:no-unsafe-any no-require-imports
    const { pattern, snapshot } = require('../src/indexForTest')

    if (!pattern) {
        const repoName: string = path.dirname(__dirname)
            .split(path.sep)
            .pop() || ''

        if (!([ 'cli', 'utilities', 'performer', 'compiler', 'pattern', 'registry', 'playroom', 'lab' ].includes(repoName))) {
            it('includes this test', () => {
                fail(`A pattern was not found. Ensure you are exporting the pattern from your 'src/indexForTest.ts'.`)
            })
        }
    }
    else {
        it('stays locked down', async (done: DoneFn) => {

            // tslint:disable-next-line:no-unsafe-any
            expect(JSON.stringify(await compilePattern(pattern), undefined, 2))
                .toEqual(JSON.stringify(snapshot, undefined, 2))

            done()
        })
    }
})
