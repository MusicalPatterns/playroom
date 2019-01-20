import { clickElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/types'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    elementValue,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY, PATTERN_SPEC_TOGGLED_PROPERTY_KEY,
    PRESETS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
} from '../../support'
import {
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
} from '../../support/constants'
import { refreshWithTestPatternSelected } from '../../support/control'

describe('presets', () => {
    beforeEach(async done => {
        await refreshWithTestPatternSelected()

        done()
    })
    
    it('does not show presets if the pattern has none', async done => {
        expect(await elementExists('#presets'))
            .toBeFalsy()

        done()
    })
    
    describe('when the pattern has presets', () => {
        beforeEach(async done => {
            const testPattern = await findElement(testGlobals.tab, `#${PRESETS_PATTERN_ID}`)
            await clickElement(testPattern)

            done()
        })

        it('shows them', async done => {
            expect(await elementExists('#presets'))
                .toBeTruthy()

            done()
        })

        it('shows the preset in the dropdown if the current spec matches it', async done => {
            await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE)
            const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
            await clickElement(buttonForSelect)

            const checkbox = await findElement(testGlobals.tab, `input#${PATTERN_SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(checkbox)
            const buttonForCheckbox = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_TOGGLED_PROPERTY_KEY}`)
            await clickElement(buttonForCheckbox)

            expect(await elementValue('#presets select'))
                .toBe('presetOne')

            done()
        })
        
        describe('choosing a preset', () => {
            beforeEach(async done => {
                await testGlobals.page.select(`#presets select`, 'presetOne')

                done()
            })

            it('sets the pattern spec', async done => {
                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_TWO_VALUE)

                await testGlobals.page.select(`#presets select`, 'presetTwo')

                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_TWO_VALUE)

                done()
            })

            it('stops showing the preset in the dropdown once the current spec no longer matches it', async done => {
                expect(await elementValue('#presets select'))
                    .toBe('presetOne')

                await testGlobals.page.select(`select#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`, SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE)
                const buttonForSelect = await findElement(testGlobals.tab, `button#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
                await clickElement(buttonForSelect)

                expect(await elementValue('#presets select'))
                    .toBe('')

                done()
            })
        })
    })
})
