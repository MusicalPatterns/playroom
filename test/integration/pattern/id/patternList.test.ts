import { Ms, Point, sleep } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidityClassName, SecretTestSelector } from '../../../../src/indexForTest'
import {
    A_BIT_LONGER,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    currentTime,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    hasBeenReset,
    isPlaying,
    leftColumnIs,
    openSpecControlsIfNotOpen,
    OPTIONED_SPEC_ONE_KEY,
    OPTIONED_SPEC_TWO_KEY,
    POST_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    POST_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    quickRefresh,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    refreshPage,
    selectLongDurationPattern,
    selectOption,
    selectPostPattern,
    selectSpecControlsPattern,
    selectTimeControlsPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../support'
import { clickTimeControl } from '../../../support/time'

const expectInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}`,
                'ranged spec one was not in its initial state',
            )
        expect(await elementInnerText(`#${RANGED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE}`,
                'ranged spec two was not in its initial state',
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE}`,
                'optioned spec one was not in its initial state',
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE}`,
                'optioned spec one was not in its initial state',
            )
    }

const expectOtherInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}`,
                `the other pattern's ranged spec one was not in its initial state`,
            )
        expect(await elementInnerText(`#${RANGED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE}`,
                `the other pattern's ranged spec two was not in its initial state`,
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE}`,
                `the other pattern's optioned spec one was not in its initial state`,
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE}`,
                `the other pattern's optioned spec one was not in its initial state`,
            )
    }

const invalidateControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.INVALID}`))
            .toBeTruthy('control was not invalidated')
    }

const controlIsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_SPEC_ONE_KEY}.${FieldValidityClassName.VALID}`))
            .toBeTruthy('control was not valid')
    }

const modifySpecs: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${RANGED_SPEC_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)

        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
        )
    }

const specsModificationsPreserved: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_SPEC_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'ranged spec modification was not preserved',
            )
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
                'optioned spec modification was not preserved',
            )
    }

describe('pattern list', (): void => {
    beforeEach(async (): Promise<void> => {
        await refreshPage()
    })

    it('shows the no-pattern message before you select a pattern', async (): Promise<void> => {
        expect(await elementExists('#no-pattern-message'))
            .toBeTruthy('no pattern message was not shown before selecting a pattern')
    })

    it('does not show a header for a pattern before you select a pattern', async (): Promise<void> => {
        expect(await elementInnerText('#second-row h1'))
            .toBe('')
    })

    describe('after selecting a pattern', (): void => {
        beforeEach(async (): Promise<void> => {
            await simulateDesktopViewport()
            await selectSpecControlsPattern()
        })

        it('no longer shows the no-pattern message', async (): Promise<void> => {
            expect(await elementExists('#no-pattern-message'))
                .toBeFalsy('no pattern message was still shown')
        })

        it('opens the right column', async (): Promise<void> => {
            expect(await elementExists('#middle-plus-right-column.right-column-open'))
                .toBeTruthy('the right column was not open')
        })

        it(`shows the pattern's name as the title`, async (): Promise<void> => {
            const title: string = await elementInnerText('#second-row h1')

            expect(title)
                .toBe('Playroom Test Spec Controls', `title was not the pattern's name`)
        })

        it('the selected pattern is highlighted', async (): Promise<void> => {
            expect(await elementExists(`#${SPEC_CONTROLS_PATTERN_ID}.selected`))
                .toBeTruthy('the selected pattern was not highlighted')
        })

        describe('selecting another pattern', (): void => {
            describe('when it is a different pattern than the current selection', (): void => {
                beforeEach(async (): Promise<void> => {
                    await openSpecControlsIfNotOpen()
                })

                it(`sets the spec to the new pattern's initial`, async (): Promise<void> => {
                    await expectInitial()

                    await selectPostPattern()
                    await expectOtherInitial()
                })

                it('if there were any invalid controls, they no longer appear as invalid', async (): Promise<void> => {
                    await invalidateControl()

                    await selectPostPattern()
                    await controlIsValid()
                })
            })

            describe('when it is the same pattern as the one already selected', (): void => {
                it('does not reset the spec modifications you have made', async (): Promise<void> => {
                    await modifySpecs()

                    await selectSpecControlsPattern()
                    await specsModificationsPreserved()
                })
            })
        })
    })

    describe('when the viewport is smaller than 1000px wide', (): void => {
        beforeEach(async (): Promise<void> => {
            await simulateMobileViewport()
        })

        afterEach(async (): Promise<void> => {
            await simulateDesktopViewport()
        })

        it('collapses the left column when you select a pattern', async (): Promise<void> => {
            await leftColumnIs('open')

            await selectSpecControlsPattern()
            await leftColumnIs('closed')
        })
    })

    describe('when a pattern is playing', (): void => {
        beforeEach(async (): Promise<void> => {
            await quickRefresh()
            await selectTimeControlsPattern()
            await clickTimeControl('play')
        })

        afterEach(async (): Promise<void> => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
        })

        it('when you select a new pattern, it resets the time to the beginning but keeps playing', async (): Promise<void> => {
            await sleep(A_BIT_LONGER)
            const timeOfSelectingNewPattern: Point<Ms> = await currentTime()

            await selectLongDurationPattern()
            await hasBeenReset({ toBefore: timeOfSelectingNewPattern })
            await isPlaying()
        })
    })
})
