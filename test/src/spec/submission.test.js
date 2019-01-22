import { clickElement, fillInElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import { testGlobals } from '../../setup'
import {
    elementInnerText,
    refreshWithTestPatternSelected,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

describe('submitting spec changes', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('submits a control when you type into it', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(previouslySubmittedControl, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlUnderTest = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await fillInElement(controlUnderTest, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('keeps the controls in the same order after making a change', async done => {
            let controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input[type=number]')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([
                    `${SPEC_ARRAYED_PROPERTY_KEY}-0`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-1`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-2`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-3`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-4`,
                    SPEC_RANGED_PROPERTY_ONE_KEY,
                    SPEC_RANGED_PROPERTY_TWO_KEY,
                ])

            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            controlIds = await testGlobals.page.evaluate(() =>
                Array.from(document.querySelectorAll('#pattern-spec-controls input[type=number]')).map(element => element.id),
            )
            expect(controlIds)
                .toEqual([
                    `${SPEC_ARRAYED_PROPERTY_KEY}-0`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-1`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-2`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-3`,
                    `${SPEC_ARRAYED_PROPERTY_KEY}-4`,
                    SPEC_RANGED_PROPERTY_ONE_KEY,
                    SPEC_RANGED_PROPERTY_TWO_KEY,
                ])

            done()
        })
    })

    describe('optioned controls', () => {
        it('immediately submits a control when you choose a new value', async done => {
            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async done => {
            const previouslySubmittedControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await fillInElement(previouslySubmittedControl, VALID_TEST_MODIFICATION)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            await testGlobals.page.select(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

            done()
        })
    })

    describe('toggled controls', () => {
        it('immediately submits when you choose a new value from a control', async done => {
            const checkbox = await findElement(testGlobals.tab, `input#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(checkbox)

            expect(await elementInnerText(`#${SPEC_TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE}`)

            done()
        })
    })

    describe('arrayed controls', () => {
        it('only submits the element you are working on, not the others in the array', async done => {
            const control = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
            await fillInElement(control, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-0 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 0 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-1 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 1 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-2 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 2 ]}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-3 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 3 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-4 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 4 ]}`)

            done()
        })
    })
})
