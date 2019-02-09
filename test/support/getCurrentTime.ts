import { DECIMAL, Ms, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../src/indexForTest'
import { elementInnerText } from './checkElement'

const currentTime: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`), DECIMAL))

const patternDuration: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_PATTERN_DURATION}`), DECIMAL))

export {
    currentTime,
    patternDuration,
}
