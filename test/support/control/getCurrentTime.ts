import { DECIMAL, Millisecond, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import { elementInnerText } from './checkElement'

const currentTime: () => Promise<Millisecond> =
    async (): Promise<Millisecond> =>
        to.Millisecond(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`), DECIMAL))

const totalDuration: () => Promise<Millisecond> =
    async (): Promise<Millisecond> =>
        to.Millisecond(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TOTAL_DURATION}`), DECIMAL))

export {
    currentTime,
    totalDuration,
}
