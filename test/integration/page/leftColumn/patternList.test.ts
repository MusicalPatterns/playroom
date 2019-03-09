import { Ms, sleep } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { FieldValidity, SecretTestSelectors } from '../../../../src/indexForTest'
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
    OPTIONED_PROPERTY_ONE_KEY,
    OPTIONED_PROPERTY_TWO_KEY,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    quickRefresh,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    refreshPage,
    selectLongDurationPattern,
    selectOption,
    selectPostPattern,
    selectSpecControlsPattern,
    selectTimeControlsPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../support'
import { clickTimeControl } from '../../../support/time'

const expectInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`,
                'spec ranged property one was not in its initial state',
            )
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`,
                'spec ranged property two was not in its initial state',
            )
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`,
                'spec optioned property one was not in its initial state',
            )
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`,
                'spec optioned property one was not in its initial state',
            )
    }

const expectOtherInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`,
                `the other pattern's spec ranged property one was not in its initial state`,
            )
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`,
                `the other pattern's spec ranged property two was not in its initial state`,
            )
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`,
                `the other pattern's spec optioned property one was not in its initial state`,
            )
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`,
                `the other pattern's spec optioned property one was not in its initial state`,
            )
    }

const invalidateControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidity.INVALID}`))
            .toBeTruthy('control was not invalidated')
    }

const controlIsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}.${FieldValidity.VALID}`))
            .toBeTruthy('control was not valid')
    }

const modifySpec: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)

        await selectOption(
            `select#${OPTIONED_PROPERTY_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
        )
    }

const specModificationsPreserved: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`,
                'spec ranged property modification was not preserved',
            )
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY} .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
                'spec optioned property modification was not preserved',
            )
    }

describe('pattern list', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('shows the no-pattern message before you select a pattern', async (done: DoneFn) => {
        expect(await elementExists('#no-pattern-message'))
            .toBeTruthy('no pattern message was not shown before selecting a pattern')

        done()
    })

    it('does not show a header for a pattern before you select a pattern', async (done: DoneFn) => {
        expect(await elementExists('#second-row h1'))
            .toBeFalsy('header was shown for pattern before selecting one')

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async (done: DoneFn) => {
            await simulateDesktopViewport()
            await selectSpecControlsPattern()
            done()
        })

        it('no longer shows the no-pattern message', async (done: DoneFn) => {
            expect(await elementExists('#no-pattern-message'))
                .toBeFalsy('no pattern message was still shown')

            done()
        })

        it('opens the right column', async (done: DoneFn) => {
            expect(await elementExists('#middle-plus-right-column.right-column-open'))
                .toBeTruthy('the right column was not open')

            done()
        })

        it(`shows the pattern's name as the title`, async (done: DoneFn) => {
            const title: string = await elementInnerText('#second-row h1')

            expect(title)
                .toBe('Playroom Test Spec Controls', `title was not the pattern's name`)

            done()
        })

        it('the selected pattern is highlighted', async (done: DoneFn) => {
            expect(await elementExists(`#${SPEC_CONTROLS_PATTERN_ID}.selected`))
                .toBeTruthy('the selected pattern was not highlighted')

            done()
        })

        describe('selecting another pattern', () => {
            describe('when it is a different pattern than the current selection', () => {
                beforeEach(async (done: DoneFn) => {
                    await openSpecControlsIfNotOpen()
                    done()
                })

                it(`sets the spec to the new pattern's initial`, async (done: DoneFn) => {
                    await expectInitial()

                    await selectPostPattern()
                    await expectOtherInitial()

                    done()
                })

                it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
                    await invalidateControl()

                    await selectPostPattern()
                    await controlIsValid()

                    done()
                })
            })

            describe('when it is the same pattern as the one already selected', () => {
                it('does not reset the spec modifications you have made', async (done: DoneFn) => {
                    await modifySpec()

                    await selectSpecControlsPattern()
                    await specModificationsPreserved()

                    done()
                })
            })
        })
    })

    describe('when the viewport is smaller than 1000px wide', () => {
        beforeEach(async (done: DoneFn) => {
            await simulateMobileViewport()

            done()
        })

        afterEach(async (done: DoneFn) => {
            await simulateDesktopViewport()

            done()
        })

        it('collapses the left column when you select a pattern', async (done: DoneFn) => {
            await leftColumnIs('open')

            await selectSpecControlsPattern()
            await leftColumnIs('closed')

            done()
        })
    })

    describe('when a pattern is playing', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectTimeControlsPattern()
            await clickTimeControl('play')
            done()
        })

        afterEach(async (done: DoneFn) => {
            if (await elementExists('#pause')) {
                await clickTimeControl('pause')
            }
            done()
        })

        it('when you select a new pattern, it resets the time to the beginning but keeps playing', async (done: DoneFn) => {
            await sleep(A_BIT_LONGER)
            const timeOfSelectingNewPattern: Ms = await currentTime()

            await selectLongDurationPattern()
            await hasBeenReset({ toBefore: timeOfSelectingNewPattern })
            await isPlaying()

            done()
        })
    })
})
