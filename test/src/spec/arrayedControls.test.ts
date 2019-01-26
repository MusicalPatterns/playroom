import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest, SpecControlStates } from '../../../src/indexForTest'
import {
    elementCount,
    elementExists,
    elementInnerText,
    findElement,
    refreshWithTestPatternSelected,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../support'

describe('arrayed controls', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('adding', () => {
        it('clicking the add button displays a new blank element at the end of the array', async (done: DoneFn) => {
            const originalArrayedPropertyElementCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

            const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await addButton.click()

            const updatedArrayedPropertyElementCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

            expect(updatedArrayedPropertyElementCount)
                .toBe(originalArrayedPropertyElementCount + 1)
            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-5`))
                .toBeTruthy()

            done()
        })

        it('does not submit the new element until you add something valid to it', async (done: DoneFn) => {
            const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await addButton.click()

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-0 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 0 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-1 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 1 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-2 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 2 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-3 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 3 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-4 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 4 ]}`)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            const newControl: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
            await newControl.type(VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)

            done()
        })

        it('lets you add two new fields at once', async (done: DoneFn) => {
            const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await addButton.click()
            await addButton.click()

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            done()
        })

        it('after adding two fields at once, if you modify the second one, the first new field stays around, marked as invalid, and your modification is not submitted at first, until you modify the other one, then both are submitted at once', async (done: DoneFn) => {
            const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await addButton.click()
            await addButton.click()

            const newControl: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6`)
            await newControl.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            const otherNewControl: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5`)
            await otherNewControl.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)

            done()
        })

        it('after adding two fields at once, if you modify the first one, the second new field stays around, marked as invalid, and your modification is not submitted at first, until you modify the other one, then both are submitted at once', async (done: DoneFn) => {
            const addButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await addButton.click()
            await addButton.click()

            const newControl: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5`)
            await newControl.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            const otherNewControl: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6`)
            await otherNewControl.type(VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)

            done()
        })
    })

    describe('removing', () => {
        it('clicking the remove button removes the last element from the array', async (done: DoneFn) => {
            const originalArrayedPropertyElementCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

            const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await removeButton.click()

            const updatedArrayedPropertyElementCount: number = await elementCount(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)

            expect(updatedArrayedPropertyElementCount)
                .toBe(originalArrayedPropertyElementCount - 1)
            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-4`))
                .toBeFalsy()

            done()
        })

        it('removing the element immediately submits the change to the array', async (done: DoneFn) => {
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE))

            const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await removeButton.click()

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.slice(0, SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.length - 1)))

            done()
        })

        it('disables the remove button when there are no elements left in the array', async (done: DoneFn) => {
            const removeButton: ElementHandle = await findElement(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await removeButton.click()
            await removeButton.click()
            await removeButton.click()
            await removeButton.click()
            await removeButton.click()

            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove:disabled`))
                .toBeTruthy()

            done()
        })
    })
})
