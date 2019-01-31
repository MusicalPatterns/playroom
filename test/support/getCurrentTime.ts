import { DECIMAL, Milliseconds, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../src/indexForTest'
import { elementInnerText } from './checkElement'

const currentTime: () => Promise<Milliseconds> =
    async (): Promise<Milliseconds> =>
        to.Milliseconds(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`), DECIMAL))

const totalDuration: () => Promise<Milliseconds> =
    async (): Promise<Milliseconds> =>
        to.Milliseconds(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TOTAL_DURATION}`), DECIMAL))

export {
    currentTime,
    totalDuration,
}
