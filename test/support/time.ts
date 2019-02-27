import { DECIMAL, from, Ms, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../src/indexForTest'
import { elementInnerText } from './checkElement'
import { LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET, LONG_ENOUGH_FOR_TIME_TO_PASS } from './constants'
import { sleep } from './sleep'

const isPaused: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Ms = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        expect(await currentTime())
            .toBe(initialTime)
    }

const isPlaying: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Ms = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        expect(await currentTime())
            .toBeGreaterThan(from.Ms(initialTime))
    }

const hasBeenReset: (options?: { toBefore?: Ms }) => Promise<void> =
    async ({ toBefore = to.Ms(1) }: { toBefore?: Ms } = {}): Promise<void> => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
        const timeAfterResetting: Ms = await currentTime()
        expect(timeAfterResetting)
            .toBeLessThan(from.Ms(toBefore))
    }

const currentTime: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`), from.Integer(DECIMAL)))

const patternDuration: () => Promise<Ms> =
    async (): Promise<Ms> =>
        to.Ms(parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_PATTERN_DURATION}`), from.Integer(DECIMAL)))

export {
    isPlaying,
    isPaused,
    hasBeenReset,
    currentTime,
    patternDuration,
}
