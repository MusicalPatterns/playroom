import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    PRESET_ONE_NAME,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_NAME,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    PRESETS_PATTERN_ID,
    refreshWithTestPatternSelected,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
} from '../../support'

describe('presets', () => {
    beforeEach(async (done: DoneFn) => {
        await refreshWithTestPatternSelected()

        done()
    })

    it('does not show presets if the pattern has none', async (done: DoneFn) => {
        expect(await elementExists('#presets'))
            .toBeFalsy()

        done()
    })

    describe('when the pattern has presets', () => {
        beforeEach(async (done: DoneFn) => {
            const testPattern: ElementHandle = await findElement(`#${PRESETS_PATTERN_ID}`)
            await testPattern.click()

            done()
        })

        it('shows them', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeTruthy()

            done()
        })

        it('shows the preset in the dropdown if the current spec matches it', async (done: DoneFn) => {
            await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

            const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
            await checkbox.click()

            expect(await elementValue('#presets select'))
                .toBe('presetOne')

            done()
        })

        describe('choosing a preset', () => {
            beforeEach(async (done: DoneFn) => {
                await selectOption(`#presets select`, PRESET_ONE_NAME)

                done()
            })

            it('sets the spec', async (done: DoneFn) => {
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_TWO_VALUE)

                await selectOption(`#presets select`, PRESET_TWO_NAME)

                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_TWO_VALUE)

                done()
            })

            it('stops showing the preset in the dropdown once the current spec no longer matches it', async (done: DoneFn) => {
                expect(await elementValue('#presets select'))
                    .toBe('presetOne')

                await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)

                expect(await elementValue('#presets select'))
                    .toBe('')

                done()
            })
        })
    })
})
