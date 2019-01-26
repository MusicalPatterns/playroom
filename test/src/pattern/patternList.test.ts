import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import { page } from '../../setup'
import {
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    refreshWithTestPatternSelected,
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

describe('pattern list', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        done()
    })

    it('shows a header for the pattern after you select it', async (done: DoneFn) => {
        await findElement('h1')

        done()
    })

    it('the selected pattern is highlighted', async (done: DoneFn) => {
        expect(await elementExists(`#${SPEC_CONTROLS_PATTERN_ID}.selected`))
            .toBeTruthy()

        done()
    })

    describe('making a selection from the pattern list', () => {
        describe('when it is a different pattern than the current selection', () => {
            it('changes the spec to the new pattern\'s defaults', async (done: DoneFn) => {
                expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)

                await selectOtherTestPattern()

                expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE}`)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(`${POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE}`)

                done()
            })

            it('if there were any invalid controls, they no longer appear as invalid', async (done: DoneFn) => {
                const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
                await control.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)

                expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.INVALID}`))
                    .toBeTruthy()

                await selectOtherTestPattern()

                expect(await elementExists(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}.${SpecControlStates.VALID}`))
                    .toBeTruthy()

                done()
            })
        })

        it('does not reset the spec changes you have made if it is the pattern which is already selected', async (done: DoneFn) => {
            const input: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await input.type(VALID_TEST_MODIFICATION)

            await page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            await selectTestPattern()

            expect(await elementValue(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })
    })
})