import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    leftColumnIs,
    openSpecControlsIfNotOpen,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    refreshPage,
    selectOption,
    selectPostPattern,
    selectSpecControlsPattern,
    simulateDesktopViewport,
    simulateMobileViewport,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

const expectInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`, 'spec ranged property one was not in its initial state')
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`, 'spec ranged property two was not in its initial state')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`, 'spec optioned property one was not in its initial state')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`, 'spec optioned property one was not in its initial state')
    }

const expectOtherInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`, 'the other pattern\'s spec ranged property one was not in its initial state')
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`, 'the other pattern\'s spec ranged property two was not in its initial state')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`, 'the other pattern\'s spec optioned property one was not in its initial state')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`, 'the other pattern\'s spec optioned property one was not in its initial state')
    }

const invalidateControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy('control was not invalidated')
    }

const controlIsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy('control was not valid')
    }

const makeSpecChanges: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)

        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const specModificationsPreserved: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'spec ranged property modification was not preserved')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE, 'spec optioned property modification was not preserved')
    }

describe('pattern list', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('shows the no-pattern message before you select one', async (done: DoneFn) => {
        expect(await elementExists('#no-pattern-message'))
            .toBeTruthy('no pattern message was not shown before selecting a pattern')

        done()
    })

    it('does not show a header for a pattern before you select one', async (done: DoneFn) => {
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

        it('no longer shows the no-pattern message after you select one', async (done: DoneFn) => {
            expect(await elementExists('#no-pattern-message'))
                .toBeFalsy('no pattern message was still shown')

            done()
        })

        it('opens the right column', async (done: DoneFn) => {
            expect(await elementExists('#middle-plus-right-columns.right-column-open'))
                .toBeTruthy('the right column was not open')

            done()
        })

        it('shows a header for the pattern after you select it', async (done: DoneFn) => {
            const patternTitle: string = await elementInnerText('#second-row h1')

            expect(patternTitle)
                .toBe('Playroom Test Spec Controls', 'header for the pattern\'s title was not shown')

            done()
        })

        it('the selected pattern is highlighted', async (done: DoneFn) => {
            expect(await elementExists(`#${SPEC_CONTROLS_PATTERN_ID}.selected`))
                .toBeTruthy('the selected pattern was not highlighted')

            done()
        })

        describe('making a new selection from the pattern list', () => {
            describe('when it is a different pattern than the current selection', () => {
                beforeEach(async (done: DoneFn) => {
                    await openSpecControlsIfNotOpen()
                    done()
                })

                it('changes the spec to the new pattern\'s initial', async (done: DoneFn) => {
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
                it('does not reset the spec changes you have made', async (done: DoneFn) => {
                    await makeSpecChanges()

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
})
