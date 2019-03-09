import { ElementHandle } from 'puppeteer'
import { FieldValidity, SecretTestSelectors } from '../../../../src/indexForTest'
import {
    ARRAYED_PROPERTY_KEY,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    elementExists,
    elementInnerText,
    findElement,
    refreshForSpecControlsTest,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    VALID_TEST_MODIFICATION,
} from '../../../support'

const modifyFieldOfArrayedSpecControl: () => Promise<void> =
    async (): Promise<void> => {
        const control: ElementHandle = await findElement(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2`)
        await control.type(VALID_TEST_MODIFICATION)
    }

const onlyThatOneFieldOfTheArrayedSpecControlIsModified: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-0 .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 0 ]}`,
                'one of the other fields of the arrayed spec control was not in its initial state, #0',
            )
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-1 .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 1 ]}`,
                'one of the other fields of the arrayed spec control was not in its initial state, #1',
            )
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-2 .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 2 ]}${VALID_TEST_MODIFICATION}`,
                'that one field of the arrayed spec control was not modified',
            )
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-3 .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 3 ]}`,
                'one of the other fields of the arrayed spec control was not in its initial state, #3',
            )
        expect(await elementInnerText(`#${ARRAYED_PROPERTY_KEY}-4 .${SecretTestSelectors.SUBMITTED_SPEC}`))
            .toBe(
                `${SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE[ 4 ]}`,
                'one of the other fields of the arrayed spec control was not in its initial state, #4',
            )
    }

const invalidateJustOneFieldOfAnArrayedSpecControl: () => Promise<void> =
    async (): Promise<void> => {
        const field: ElementHandle = await findElement(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2`)
        await field.type(BAD_FORMAT_INVALID_TEST_MODIFICATION)
    }

const justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedSpecControlAreStillMarkedAsValid: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-0.${FieldValidity.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed spec control was not valid, #0')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-1.${FieldValidity.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed spec control was not valid, #1')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-2.${FieldValidity.INVALID}`))
            .toBeTruthy('that one feild of the arrayed spec control was not marked as invalid')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-3.${FieldValidity.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed spec control was not valid, #3')
        expect(await elementExists(`input[type=number]#${ARRAYED_PROPERTY_KEY}-4.${FieldValidity.VALID}`))
            .toBeTruthy('one of the other fields of the arrayed spec control was not valid, #4')
    }

describe('arrayed spec control', () => {
    describe('submitting', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            done()
        })

        it('only submits the field you modify, not the others', async (done: DoneFn) => {
            await modifyFieldOfArrayedSpecControl()
            await onlyThatOneFieldOfTheArrayedSpecControlIsModified()

            done()
        })
    })

    describe('invalid state', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()
            await invalidateJustOneFieldOfAnArrayedSpecControl()

            done()
        })

        it('only marks the specific field which is invalid', async (done: DoneFn) => {
            await justThatOneFieldIsMarkedIsInvalidAndTheOtherFieldsOfThatArrayedSpecControlAreStillMarkedAsValid()

            done()
        })
    })
})
