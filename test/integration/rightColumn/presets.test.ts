import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    openSpecControlsIfNotOpen,
    PRESET_ONE_NAME,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_NAME,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    PRESETS_PATTERN_ID,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    selectOption,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
} from '../../support'

const PRESETS_SELECT: string = '#presets select'

const selectPresetPattern: () => Promise<void> =
    async (): Promise<void> => {
        const testPattern: ElementHandle = await findElement(`#${PRESETS_PATTERN_ID}`)
        await testPattern.click()
    }

const bringSpecIntoConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)

        const checkbox: ElementHandle = await findElement(`input#${SPEC_TOGGLED_PROPERTY_KEY}`)
        await checkbox.click()
    }

const currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetsDropdown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('presetOne')
    }

const currentSpecMatchesNoPresetsAndThusThePresetsDropdownDisplaysNothing: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('')
    }

const breakConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
    }

const selectAPreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`#presets select`, PRESET_ONE_NAME)
    }

const selectADifferentPreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`#presets select`, PRESET_TWO_NAME)
    }

const specIsInConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_ONE_PROPERTY_ONE_VALUE)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_ONE_PROPERTY_TWO_VALUE)
    }

const specIsInConformityWithTheDifferentPreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_TWO_PROPERTY_ONE_VALUE)
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_TWO_PROPERTY_TWO_VALUE)
    }

describe('presets', () => {
    beforeEach(async (done: DoneFn) => {
        await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
        await openSpecControlsIfNotOpen()

        done()
    })

    it('does not show presets if the pattern has none', async (done: DoneFn) => {
        expect(await elementExists('#presets'))
            .toBeFalsy()

        done()
    })

    describe('when the pattern has presets', () => {
        beforeEach(async (done: DoneFn) => {
            await selectPresetPattern()

            done()
        })

        it('shows them', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeTruthy()

            done()
        })

        it('displays the preset in the dropdown input whenever the current spec is a match for it', async (done: DoneFn) => {
            await bringSpecIntoConformityWithThePreset()
            await currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetsDropdown()

            done()
        })

        describe('choosing a preset', () => {
            beforeEach(async (done: DoneFn) => {
                await selectAPreset()

                done()
            })

            it('sets the spec', async (done: DoneFn) => {
                await specIsInConformityWithThePreset()

                await selectADifferentPreset()
                await specIsInConformityWithTheDifferentPreset()

                done()
            })

            it('stops showing the preset in the dropdown once the current spec no longer matches it', async (done: DoneFn) => {
                await currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetsDropdown()

                await breakConformityWithThePreset()
                await currentSpecMatchesNoPresetsAndThusThePresetsDropdownDisplaysNothing()

                done()
            })
        })
    })
})
