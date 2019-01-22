import { clickElement, findElement } from 'puppet-strings'
import { fillInElement } from 'puppet-strings/index'
import { SpecControlStates } from '../../../src/spec/components/types'
import { SecretSelectorsForTest } from '../../../src/types'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    refreshWithTestPatternSelected,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../support'

describe('arrayed controls', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()
        done()
    })

    describe('adding', () => {
        it('clicking the add button displays a new blank element at the end of the array', async done => {
            const originalArrayedPropertyElementCount = await testGlobals.page.evaluate(
                SPEC_ARRAYED_PROPERTY_KEY =>
                    Array.from(document.querySelectorAll(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)).length,
                SPEC_ARRAYED_PROPERTY_KEY,
            )

            const addButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await clickElement(addButton)

            const updatedArrayedPropertyElementCount = await testGlobals.page.evaluate(
                SPEC_ARRAYED_PROPERTY_KEY =>
                    Array.from(document.querySelectorAll(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)).length,
                SPEC_ARRAYED_PROPERTY_KEY,
            )

            expect(updatedArrayedPropertyElementCount).toBe(originalArrayedPropertyElementCount + 1)
            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-5`))
                .toBeTruthy()

            done()
        })

        it('does not submit the new element until you add something valid to it', async done => {
            const addButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await clickElement(addButton)

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

            const newControl = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY}-5 input[type=number]`)
            await fillInElement(newControl, VALID_TEST_MODIFICATION)

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(VALID_TEST_MODIFICATION)

            done()
        })

        it('lets you add two new fields at once', async done => {
            const addButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await clickElement(addButton)
            await clickElement(addButton)

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            done()
        })

        it('after adding two fields at once, if you modify the second one, the first new field stays around, marked as invalid, and your modification is not submitted at first, until you modify the other one, then both are submitted at once', async done => {
            const addButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await clickElement(addButton)
            await clickElement(addButton)

            const newControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6`)
            await fillInElement(newControl, VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            const otherNewControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5`)
            await fillInElement(otherNewControl, VALID_TEST_MODIFICATION)

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

        it('after adding two fields at once, if you modify the first one, the second new field stays around, marked as invalid, and your modification is not submitted at first, until you modify the other one, then both are submitted at once', async done => {
            const addButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .add`)
            await clickElement(addButton)
            await clickElement(addButton)

            const newControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5`)
            await fillInElement(newControl, VALID_TEST_MODIFICATION)

            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-5.${SpecControlStates.VALID}`))
                .toBeTruthy()
            expect(await elementExists(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6.${SpecControlStates.INVALID}`))
                .toBeTruthy()
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-5 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY}-6 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe('')

            const otherNewControl = await findElement(testGlobals.tab, `input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-6`)
            await fillInElement(otherNewControl, VALID_TEST_MODIFICATION)

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
        it('clicking the remove button removes the last element from the array', async done => {
            const originalArrayedPropertyElementCount = await testGlobals.page.evaluate(
                SPEC_ARRAYED_PROPERTY_KEY =>
                    Array.from(document.querySelectorAll(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)).length,
                SPEC_ARRAYED_PROPERTY_KEY,
            )

            const removeButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await clickElement(removeButton)

            const updatedArrayedPropertyElementCount = await testGlobals.page.evaluate(
                SPEC_ARRAYED_PROPERTY_KEY =>
                    Array.from(document.querySelectorAll(`#${SPEC_ARRAYED_PROPERTY_KEY} input[type=number]`)).length,
                SPEC_ARRAYED_PROPERTY_KEY,
            )

            expect(updatedArrayedPropertyElementCount).toBe(originalArrayedPropertyElementCount - 1)
            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY}-4`))
                .toBeFalsy()

            done()
        })

        it('removing the element immediately submits the change to the array', async done => {
            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE))

            const removeButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await clickElement(removeButton)

            expect(await elementInnerText(`#${SPEC_ARRAYED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                .toBe(JSON.stringify(SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.slice(0, SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE.length - 1)))

            done()
        })

        it('disables the remove button when there are no elements left in the array', async done => {
            const removeButton = await findElement(testGlobals.tab, `#${SPEC_ARRAYED_PROPERTY_KEY} .remove`)
            await clickElement(removeButton)
            await clickElement(removeButton)
            await clickElement(removeButton)
            await clickElement(removeButton)
            await clickElement(removeButton)

            expect(await elementExists(`#${SPEC_ARRAYED_PROPERTY_KEY} .remove:disabled`))
                .toBeTruthy()

            done()
        })
    })
})
