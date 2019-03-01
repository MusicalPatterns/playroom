import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    openSpecControlsIfNotOpen,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    refreshPage,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    selectOption,
    selectOtherTestPattern,
    selectTestPattern,
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
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)
    }

const expectOtherInitial: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)
    }

const invalidateControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
            .toBeTruthy()
    }

const controlIsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
            .toBeTruthy()
    }

const makeSpecChanges: () => Promise<void> =
    async (): Promise<void> => {
        const input: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await input.type(VALID_TEST_MODIFICATION)

        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const specChangesPreserved: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

describe('pattern list', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshPage()
        done()
    })

    it('shows the no-pattern message before you select one', async (done: DoneFn) => {
        expect(await elementExists('#no-pattern-message'))
            .toBeTruthy()

        done()
    })

    it('does not show a header for a pattern before you select one', async (done: DoneFn) => {
        expect(await elementExists('#second-row h1'))
            .toBeFalsy()

        done()
    })

    describe('after selecting a pattern', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await openSpecControlsIfNotOpen()
            done()
        })

        it('no longer shows the no-pattern message after you select one', async (done: DoneFn) => {
            expect(await elementExists('#no-pattern-message'))
                .toBeFalsy()

            done()
        })

        it('shows a header for the pattern after you select it', async (done: DoneFn) => {
            const patternTitle: string = await elementInnerText('#second-row h1')

            expect(patternTitle)
                .toBe('Playroom Test Spec Controls')

            done()
        })

        it('the selected pattern is highlighted', async (done: DoneFn) => {
            expect(await elementExists(`#${SPEC_CONTROLS_PATTERN_ID}.selected`))
                .toBeTruthy()

            done()
        })

        describe('making a new selection from the pattern list', () => {
            describe('when it is a different pattern than the current selection', () => {
                it('changes the spec to the new pattern\'s initial', async (done: DoneFn) => {
                    await expectInitial()

                    await selectOtherTestPattern()
                    await expectOtherInitial()

                    done()
                })

                it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
                    await invalidateControl()

                    await selectOtherTestPattern()
                    await controlIsValid()

                    done()
                })
            })

            describe('when it is the same pattern as the one already selected', () => {
                it('does not reset the spec changes you have made', async (done: DoneFn) => {
                    await makeSpecChanges()

                    await selectTestPattern()
                    await specChangesPreserved()

                    done()
                })
            })
        })
    })
})
