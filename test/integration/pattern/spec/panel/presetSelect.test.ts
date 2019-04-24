import { Ms, Point, sleep } from '@musical-patterns/utilities'
import { SecretTestSelector } from '../../../../../src/indexForTest'
import {
    A_BIT_LONGER,
    clickTimeControl,
    currentTime,
    elementExists,
    elementInnerText,
    elementValue,
    hasBeenReset,
    isAfter,
    isPlaying,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    openSpecControlsIfNotOpen,
    OPTIONED_SPEC_ONE_KEY,
    OPTIONED_SPEC_TWO_KEY,
    PRESET_ONE_NAME,
    PRESET_ONE_SPEC_ONE_VALUE,
    PRESET_ONE_SPEC_TWO_VALUE,
    PRESET_TWO_NAME,
    PRESET_TWO_SPEC_ONE_VALUE,
    PRESET_TWO_SPEC_TWO_VALUE,
    quickRefresh,
    refreshForSpecControlsTest,
    selectLongDurationPattern,
    selectOption,
    selectPresetsPattern,
    selectRestartPattern,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
} from '../../../../support'

const PRESETS_SELECT: string = '#presets select'

const bringSpecsIntoConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
        )
    }

const currentSpecsMatchesThePresetAndThusItIsDisplayedInThePresetSelect: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe(
                'presetOne',
                'the preset name was not displayed in the preset select probably because the current spec did not match the preset',
            )
    }

const currentSpecsMatchesNoPresetsAndThusThePresetSelectDisplaysNothing: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementValue(PRESETS_SELECT))
            .toBe('', 'the current spec must have matched a preset because the select displayed something')
    }

const breakConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        await selectOption(
            `select#${OPTIONED_SPEC_ONE_KEY}`,
            SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
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

const specsAreInConformityWithThePreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_ONE_SPEC_ONE_VALUE, 'spec one value was not in conformity with the preset')
        expect(await elementInnerText(`#${OPTIONED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_ONE_SPEC_TWO_VALUE, 'spec two value was not in conformity with the preset')
    }

const specsAreInConformityWithTheDifferentPreset: () => Promise<void> =
    async (): Promise<void> => {
        expect(await elementInnerText(`#${OPTIONED_SPEC_ONE_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_TWO_SPEC_ONE_VALUE, 'spec one value was not in conformity with the different preset')
        expect(await elementInnerText(`#${OPTIONED_SPEC_TWO_KEY}.${SecretTestSelector.SUBMITTED_SPEC}`))
            .toBe(PRESET_TWO_SPEC_TWO_VALUE, 'spec two value was not in conformity with the different preset')
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
            await bringSpecsIntoConformityWithThePreset()
            await currentSpecsMatchesThePresetAndThusItIsDisplayedInThePresetSelect()

            done()
        })

        describe('choosing a preset', () => {
            beforeEach(async (done: DoneFn) => {
                await selectAPreset()

                done()
            })

            it('sets the spec', async (done: DoneFn) => {
                await specsAreInConformityWithThePreset()

                await selectADifferentPreset()
                await specsAreInConformityWithTheDifferentPreset()

                done()
            })

            it('stops showing the preset in the select once the current spec no longer matches it', async (done: DoneFn) => {
                await currentSpecsMatchesThePresetAndThusItIsDisplayedInThePresetSelect()

                await breakConformityWithThePreset()
                await currentSpecsMatchesNoPresetsAndThusThePresetSelectDisplaysNothing()

                done()
            })
        })

        describe('when a pattern is playing', () => {
            beforeEach(async (done: DoneFn) => {
                await quickRefresh()
                await selectLongDurationPattern()
                await clickTimeControl('play')
                await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

                done()
            })

            afterEach(async (done: DoneFn) => {
                if (await elementExists('#pause')) {
                    await clickTimeControl('pause')
                }
                done()
            })

            it('keeps playing when you select a preset but does not reset time to the beginning', async (done: DoneFn) => {
                const timeOfSelectingPreset: Point<Ms> = await currentTime()

                await openSpecControlsIfNotOpen()
                await selectAPreset()
                await isAfter(timeOfSelectingPreset)
                await isPlaying()

                done()
            })
        })

        describe('when a pattern is playing that restarts upon spec modification', () => {
            beforeEach(async (done: DoneFn) => {
                await quickRefresh()
                await selectRestartPattern()
                await clickTimeControl('play')
                await sleep(LONG_ENOUGH_FOR_TIME_TO_PASS)

                done()
            })

            afterEach(async (done: DoneFn) => {
                if (await elementExists('#pause')) {
                    await clickTimeControl('pause')
                }
                done()
            })

            it('keeps playing when you select a preset and resets time to the beginning', async (done: DoneFn) => {
                await openSpecControlsIfNotOpen()
                await sleep(A_BIT_LONGER)
                const timeOfSelectingPreset: Point<Ms> = await currentTime()
                await selectAPreset()
                await hasBeenReset({ toBefore: timeOfSelectingPreset })
                await isPlaying()

                done()
            })
        })
    })
})
