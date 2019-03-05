import { sleep, to } from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { SecretSelectorsForTest } from '../../../src/indexForTest'
import {
    elementExists,
    elementInnerText,
    elementValue,
    findElement,
    openSpecControlsIfNotOpen,
    POST_PATTERN_ID,
    PRESET_ONE_NAME,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_NAME,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    PRESETS_PATTERN_ID,
    resetSpecByTogglingToOtherPatternThenBackToTestPattern,
    selectOption,
    simulateDesktopViewport,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
} from '../../support'

const PRESETS_SELECT: string = '#presets select'

const selectPresetPattern: () => Promise<void> =
    async (): Promise<void> => {
        await simulateDesktopViewport()
        const otherPattern: ElementHandle = await findElement(`#${POST_PATTERN_ID}`)
        await otherPattern.click()
        const presetsPattern: ElementHandle = await findElement(`#${PRESETS_PATTERN_ID}`)
        await presetsPattern.click()
    }

const bringSpecIntoConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(`select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
    }

const currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetsDropdown: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('presetOne', 'the preset name was not displayed in the preset dropdown probably because the current spec did not match the preset')
    }

const currentSpecMatchesNoPresetsAndThusThePresetsDropdownDisplaysNothing: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('', 'the current spec must have matched a preset because the dropdown displayed something')
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
            .toBe(PRESET_ONE_PROPERTY_ONE_VALUE, 'property one value was not in conformity with the preset')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_ONE_PROPERTY_TWO_VALUE, 'property two value was not in conformity with the preset')
    }

const specIsInConformityWithTheDifferentPreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_TWO_PROPERTY_ONE_VALUE, 'property one value was not in conformity with the different preset')
        expect(await elementInnerText(`#${SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL}`))
            .toBe(PRESET_TWO_PROPERTY_TWO_VALUE, 'property two value was not in conformity with the different preset')
    }

describe('presets', () => {
    describe('when the pattern does not have presets', () => {
        beforeEach(async (done: DoneFn) => {
            await resetSpecByTogglingToOtherPatternThenBackToTestPattern()
            await openSpecControlsIfNotOpen()

            done()
        })

        it('does not show presets dropdown', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeFalsy('presets dropdown was shown')

            done()
        })
    })

    describe('when the pattern has presets', () => {
        beforeEach(async (done: DoneFn) => {
            await selectPresetPattern()
            await openSpecControlsIfNotOpen()

            done()
        })

        it('shows them', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeTruthy('presets were not shown')

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
