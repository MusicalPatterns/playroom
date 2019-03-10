import { SecretTestSelector } from '../../../../src/indexForTest'
import {
    elementExists,
    elementInnerText,
    elementValue,
    openSpecControlsIfNotOpen,
    OPTIONED_PROPERTY_ONE_KEY,
    OPTIONED_PROPERTY_TWO_KEY,
    PRESET_ONE_NAME,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_NAME,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    quickRefresh,
    refreshForSpecControlsTest,
    selectOption,
    selectPresetsPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../../support'

const PRESETS_SELECT: string = '#presets select'

const bringSpecIntoConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_PROPERTY_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
        )
    }

const currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetSelect: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe(
                'presetOne',
                'the preset name was not displayed in the preset select probably because the current spec did not match the preset',
            )
    }

const currentSpecMatchesNoPresetsAndThusThePresetSelectDisplaysNothing: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('', 'the current spec must have matched a preset because the select displayed something')
    }

const breakConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_PROPERTY_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
        )
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
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_ONE_PROPERTY_ONE_VALUE, 'property one value was not in conformity with the preset')
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_ONE_PROPERTY_TWO_VALUE, 'property two value was not in conformity with the preset')
    }

const specIsInConformityWithTheDifferentPreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_TWO_PROPERTY_ONE_VALUE, 'property one value was not in conformity with the different preset')
        expect(await elementInnerText(`#${OPTIONED_PROPERTY_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_TWO_PROPERTY_TWO_VALUE, 'property two value was not in conformity with the different preset')
    }

describe('preset select', () => {
    describe('when the pattern does not have presets', () => {
        beforeEach(async (done: DoneFn) => {
            await refreshForSpecControlsTest()

            done()
        })

        it('does not show the preset select', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeFalsy('preset select was shown')

            done()
        })
    })

    describe('when the pattern has presets', () => {
        beforeEach(async (done: DoneFn) => {
            await quickRefresh()
            await selectPresetsPattern()
            await openSpecControlsIfNotOpen()

            done()
        })

        it('shows them', async (done: DoneFn) => {
            expect(await elementExists('#presets'))
                .toBeTruthy('presets were not shown')

            done()
        })

        it('displays the preset in the select whenever the current spec is a match for it', async (done: DoneFn) => {
            await bringSpecIntoConformityWithThePreset()
            await currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetSelect()

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

            it('stops showing the preset in the select once the current spec no longer matches it', async (done: DoneFn) => {
                await currentSpecMatchesThePresetAndThusItIsDisplayedInThePresetSelect()

                await breakConformityWithThePreset()
                await currentSpecMatchesNoPresetsAndThusThePresetSelectDisplaysNothing()

                done()
            })
        })
    })
})
