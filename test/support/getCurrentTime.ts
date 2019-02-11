import { DECIMAL, from, Ms, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../src/indexForTest'
import { elementInnerText } from './checkElement'

const currentTime: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`), from.Integer(DECIMAL)))

const patternDuration: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_PATTERN_DURATION}`), from.Integer(DECIMAL)))

export {
    currentTime,
    patternDuration,
}
