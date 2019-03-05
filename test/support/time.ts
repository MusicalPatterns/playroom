import { DECIMAL, from, Ms, sleep, to } from '@musical-patterns/utilities'
import { SecretSelectorsForTest } from '../../src/indexForTest'
import { LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET, LONG_ENOUGH_FOR_TIME_TO_PASS } from './constants'
import { elementInnerText } from './generic'

const isPaused: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Ms = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const shouldBeSameTime: Ms = await currentTime()
        expect(shouldBeSameTime)
            .toBe(initialTime, `was not paused: second time taken was ${shouldBeSameTime} while initial time was ${initialTime}`)
    }

const isPlaying: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Ms = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const shouldBeLaterTime: Ms = await currentTime()
        expect(shouldBeLaterTime)
            .toBeGreaterThan(from.Ms(initialTime), `was not playing: second time was ${shouldBeLaterTime} while initial time was ${initialTime}`)
    }

const hasBeenReset: (options?: { toBefore?: Ms }) => Promise<void> =
    async ({ toBefore = to.Ms(1) }: { toBefore?: Ms } = {}): Promise<void> => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
        const timeAfterResetting: Ms = await currentTime()
        expect(timeAfterResetting)
            .toBeLessThan(from.Ms(toBefore), `time was not reset: time after resetting was ${timeAfterResetting} while it was expected to be before ${toBefore}`)
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
