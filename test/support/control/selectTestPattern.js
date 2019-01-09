import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { OTHER_TEST_PATTERN_ID } from '../constants'
import { TEST_PATTERN_ID } from './../constants'
import { reset } from './reset'

const selectTestPatternAndReset = async () => {
    await selectTestPattern()
    await reset()
}

const selectTestPattern = async () => {
    const testPattern = await findElement(testGlobals.tab, `#${TEST_PATTERN_ID}`)
    await clickElement(testPattern)
}

const selectOtherTestPattern = async () => {
    const otherTestPattern = await findElement(testGlobals.tab, `#${OTHER_TEST_PATTERN_ID}`)
    await clickElement(otherTestPattern)
}

export {
    selectTestPattern,
    selectTestPatternAndReset,
    selectOtherTestPattern,
}
