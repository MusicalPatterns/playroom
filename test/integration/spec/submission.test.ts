// tslint:disable no-duplicate-string

import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    ARRAYED_PROPERTY_KEY,
    clickElement,
    elementIds,
    elementInnerText,
    findElement,
    OPTIONED_PROPERTY_ONE_KEY,
    OPTIONED_PROPERTY_TWO_KEY,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    refreshForSpecControlsTest,
    selectOption,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    STRINGED_PROPERTY_KEY,
    TOGGLED_PROPERTY_KEY,
    VALID_TEST_MODIFICATION,
} from '../../support'

const modifyRangedControl: () => Promise<void> =
    async (): Promise<void> => {
        const rangedControl: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_ONE_KEY}`)
        await rangedControl.type(VALID_TEST_MODIFICATION)
    }

const modifyOptionedControl: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${OPTIONED_PROPERTY_TWO_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE)
    }

const modifyStringedControl: () => Promise<void> =
    async (): Promise<void> => {
        const stringedControl: ElementHandle = await findElement(`input[type=text]#${STRINGED_PROPERTY_KEY}`)
        await stringedControl.type(VALID_TEST_MODIFICATION)
    }

const modifyToggledControl: () => Promise<void> =
    async (): Promise<void> => {
        await clickElement(`input#${TOGGLED_PROPERTY_KEY}`)
    }

const modifyFieldOfArrayedSpecControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const rangedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'ranged control was not modified')
    }

const optionedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE, 'optioned control was not modified')
    }

const stringedControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${STRINGED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'stringed control was not modified')
    }

const toggledControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${TOGGLED_PROPERTY_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE}`, 'toggled control was not modified')
    }

const onlyThatOneFieldOfTheArrayedSpecControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-0 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 0 ]}`, 'one of the other fields of the arrayed control was not in its initial state')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-1 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 1 ]}`, 'one of the other fields of the arrayed control was not in its initial state')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-2 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 2 ]}${VALID_TEST_MODIFICATION}`, 'that one field of the arrayed control was not modified')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-3 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 3 ]}`, 'one of the other fields of the arrayed control was not in its initial state')
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-4 .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 4 ]}`, 'one of the other fields of the arrayed control was not in its initial state')
    }

const modifySomeOtherControls: () => Promise<void> =
    async (): Promise<void> => {
        const previouslySubmittedControl: ElementHandle = await findElement(`input[type=number]#${RANGED_PROPERTY_TWO_KEY}`)
        await previouslySubmittedControl.type(VALID_TEST_MODIFICATION)

        await selectOption(`select#${OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const thoseOtherControlsAreStillModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${RANGED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(`${SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE}${VALID_TEST_MODIFICATION}`, 'the other control that was a ranged control was not still modified')
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE, 'the other control that was an optioned control was not still modified')
    }

const controlsAreInOrder: () => Promise<void> =
    async (): Promise<void> => {
        const controlIds: string[] = await elementIds('#spec-panel input[type=number]')
        expect(controlIds)
            .toEqual(
                [
                    `${ARRAYED_PROPERTY_KEY}-0`,
                    `${ARRAYED_PROPERTY_KEY}-1`,
                    `${ARRAYED_PROPERTY_KEY}-2`,
                    `${ARRAYED_PROPERTY_KEY}-3`,
                    `${ARRAYED_PROPERTY_KEY}-4`,
                    RANGED_PROPERTY_ONE_KEY,
                    RANGED_PROPERTY_TWO_KEY,
                ],
                'the controls were not in order',
            )
    }

describe('submitting spec changes', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshForSpecControlsTest()
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

    describe('stringed controls', () => {
        it('submits a control when you type into it', async (done: DoneFn) => {
            await modifyStringedControl()
            await stringedControlIsModified()

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
            await modifyFieldOfArrayedSpecControl()
            await onlyThatOneFieldOfTheArrayedSpecControlIsModified()

            done()
        })
    })
})
