import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { TEST_PATTERN_ID } from './../constants'

const selectTestPattern = async () => {
    const exampleSong = await findElement(testGlobals.tab, `#${TEST_PATTERN_ID}`)
    await clickElement(exampleSong)
}

export {
    selectTestPattern,
}
