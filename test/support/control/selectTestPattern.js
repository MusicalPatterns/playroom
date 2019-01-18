import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { POST_PATTERN_ID } from '../constants'
import { SPEC_CONTROLS_PATTERN_ID } from './../constants'

const selectTestPattern = async () => {
    const testPattern = await findElement(testGlobals.tab, `#${SPEC_CONTROLS_PATTERN_ID}`)
    await clickElement(testPattern)
}

const selectOtherTestPattern = async () => {
    const otherTestPattern = await findElement(testGlobals.tab, `#${POST_PATTERN_ID}`)
    await clickElement(otherTestPattern)
}

export {
    selectTestPattern,
    selectOtherTestPattern,
}
