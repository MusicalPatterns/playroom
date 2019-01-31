import { ElementHandle } from 'puppeteer'
import { POST_PATTERN_ID, SPEC_CONTROLS_PATTERN_ID } from './constants'
import { findElement } from './findElement'

const selectTestPattern: () => Promise<void> =
    async (): Promise<void> => {
        const testPattern: ElementHandle = await findElement(`#${SPEC_CONTROLS_PATTERN_ID}`)
        await testPattern.click()
    }

const selectOtherTestPattern: () => Promise<void> =
    async (): Promise<void> => {
        const otherTestPattern: ElementHandle = await findElement(`#${POST_PATTERN_ID}`)
        await otherTestPattern.click()
    }

export {
    selectTestPattern,
    selectOtherTestPattern,
}
