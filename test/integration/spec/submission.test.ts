import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    elementIds,
    elementInnerText,
    findElement,
    openSpecControlsIfNotOpen,
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
    toggleToOtherPatternThenBackToTestPattern,
    VALID_TEST_MODIFICATION,
} from '../../support'

const modifyRangedControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_ONE_KEY}`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const modifyOptionedControl: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)
    }

const modifyToggledControl: () => Promise<void> =
    async (): Promise<void> => {
        const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
        await checkbox.click()
    }

const modifyFieldOfArrayedControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${SPEC_ARRAYED_PROPERTY_KEY}-2`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const rangedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
    }

const optionedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)
    }

const toggledControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE}`)
    }

const onlyThatOneFieldOfTheArrayedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
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
    }

const modifySomeOtherControls: () => Promise<void> =
    async (): Promise<void> => {
        const previouslySubmittedControl: ElementHandle = await findElement(`input[type=number]#${SPEC_RANGED_PROPERTY_TWO_KEY}`)
        await previouslySubmittedControl.type(VALID_TEST_MODIFICATION)

        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const thoseOtherControlsAreStillModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const controlsAreInOrder: () => Promise<void> =
    async (): Promise<void> => {
        const controlIds: string[] = await elementIds('#spec-panel input[type=number]')
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
    }

// tslint:disable-next-line no-type-definitions-outside-types-modules
describe('submitting spec changes', () => {
    beforeEach(async (done: DoneFn) => {
        await toggleToOtherPatternThenBackToTestPattern()
        await openSpecControlsIfNotOpen()
        done()
    })

    describe('ranged controls', () => {
        it('submits a control when you type into it', async (done: DoneFn) => {
            await modifyRangedControl()
            await rangedControlIsModified()

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async (done: DoneFn) => {
            await modifySomeOtherControls()

            await modifyRangedControl()
            await thoseOtherControlsAreStillModified()

            done()
        })

        it('keeps the controls in the same order after making a change', async (done: DoneFn) => {
            await controlsAreInOrder()

            await modifyRangedControl()
            await controlsAreInOrder()

            done()
        })
    })

    describe('optioned controls', () => {
        it('immediately submits a control when you choose a new value', async (done: DoneFn) => {
            await modifyOptionedControl()
            await optionedControlIsModified()

            done()
        })

        it('preserves earlier spec changes you have made when you change a second control', async (done: DoneFn) => {
            await modifySomeOtherControls()

            await modifyOptionedControl()
            await thoseOtherControlsAreStillModified()

            done()
        })
    })

    describe('toggled controls', () => {
        it('immediately submits when you choose a new value from a control', async (done: DoneFn) => {
            await modifyToggledControl()
            await toggledControlIsModified()

            done()
        })
    })

    describe('arrayed controls', () => {
        it('only submits the element you are working on, not the others in the array', async (done: DoneFn) => {
            await modifyFieldOfArrayedControl()
            await onlyThatOneFieldOfTheArrayedControlIsModified()

            done()
        })
    })
})
