import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    elementIds,
    elementInnerText,
    findElement,
    refreshWithTestPatternSelected,
    selectOption,
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

// tslint:disable-next-line:no-type-definitions-outside-types-modules
describe('submitting spec changes', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('ranged controls', () => {
        it('submits a control when you type into it', async (done: DoneFn) => {
            const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async (done: DoneFn) => {
            const previouslySubmittedControl: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await previouslySubmittedControl.type(VALID_TEST_MODIFICATION)

            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const controlUnderTest: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
            await controlUnderTest.type(VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)

            done()
        })

        it('keeps the controls in the same order after making a change', async (done: DoneFn) => {
            let controlIds: string[] = await elementIds('#spec-panel input[type=number]')
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

            const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await control.type(VALID_TEST_MODIFICATION)

            controlIds = await elementIds('#spec-panel input[type=number]')
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
        it('immediately submits a control when you choose a new value', async (done: DoneFn) => {
            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async (done: DoneFn) => {
            const previouslySubmittedControl: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
            await previouslySubmittedControl.type(VALID_TEST_MODIFICATION)

            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)

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
        it('immediately submits when you choose a new value from a control', async (done: DoneFn) => {
            const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await checkbox.click()

            expect(await elementInnerText(`#${SPEC_TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE}`)

            done()
        })
    })

    describe('arrayed controls', () => {
        it('only submits the element you are working on, not the others in the array', async (done: DoneFn) => {
            const control: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
            await control.type(VALID_TEST_MODIFICATION)

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
