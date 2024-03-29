import { as, AsyncThunk, Duration, Ms, musicalAs, parseInteger, Point, sleep } from '@musical-patterns/utilities'
import { SecretTestSelector } from '../../src/indexForTest'
import { LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET, LONG_ENOUGH_FOR_TIME_TO_PASS } from './constants'
import { clickElement, elementInnerText } from './generic'

const isPaused: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Point<Ms> = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const shouldBeSameTime: Point<Ms> = await currentTime()
        expect(shouldBeSameTime)
            .toBe(
                initialTime,
                `was not paused: second time taken was ${String(shouldBeSameTime)} while initial time was ${String(initialTime)}`,
            )
    }

const isPlaying: () => Promise<void> =
    async (): Promise<void> => {
        const initialTime: Point<Ms> = await currentTime()
        await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)
        const shouldBeLaterTime: Point<Ms> = await currentTime()
        expect(shouldBeLaterTime)
            .toBeGreaterThanTyped(
                initialTime,
                `was not playing: second time was ${String(shouldBeLaterTime)} while initial time was ${String(initialTime)}`,
            )
    }

const hasBeenReset: (options?: { toBefore?: Point<Ms> }) => Promise<void> =
    async ({ toBefore = as.Point<Ms>(1) }: { toBefore?: Point<Ms> } = {}): Promise<void> => {
        await sleep(LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET)
        const timeAfterResetting: Point<Ms> = await currentTime()
        expect(timeAfterResetting)
            .toBeLessThanTyped(
                toBefore,
                `time was not reset: time after resetting was ${String(timeAfterResetting)} while it was expected to be before ${String(toBefore)}`,
            )
    }

const currentTime: AsyncThunk<Point<Ms>> =
    async (): Promise<Point<Ms>> =>
        as.Point<Ms>(parseInteger(await elementInnerText(`#${SecretTestSelector.TIME}`)))

const patternDuration: AsyncThunk<Duration> =
    async (): Promise<Duration> =>
        musicalAs.Duration(parseInteger(await elementInnerText(`#${SecretTestSelector.PATTERN_DURATION}`)))

const clickTimeControl: (control: string) => Promise<void> =
    async (control: string): Promise<void> => {
        await clickElement(`#${control}`)
    }

const isAfter: (previousTime: Point<Ms>) => Promise<void> =
    async (previousTime: Point<Ms>): Promise<void> => {
        const newTime: Point<Ms> = await currentTime()

        expect(newTime)
            .toBeGreaterThanTyped(previousTime, `time ${String(newTime)} was not after ${String(previousTime)}`)
    }

export {
    isPlaying,
    isPaused,
    hasBeenReset,
    currentTime,
    patternDuration,
    clickTimeControl,
    isAfter,
}
