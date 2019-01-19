import { clickElement, findElement } from 'puppet-strings'
import { SecretSelectorsForTest } from '../../../src/types'
import { testGlobals } from '../../setup'
import {
    elementExists,
    elementInnerText,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY, PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY,
    PRESETS_PATTERN_ID,
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
        
        describe('choosing a preset', () => {
            it('sets the pattern spec', async done => {
                await testGlobals.page.select(`select#presets`, 'presetOne')

                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_ONE_PROPERTY_TWO_VALUE)

                await testGlobals.page.select(`select#presets`, 'presetTwo')

                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_ONE_VALUE)
                expect(await elementInnerText(`#${PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY} .${SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL}`))
                    .toBe(PRESET_TWO_PROPERTY_TWO_VALUE)

                done()
            })
        })
    })
})
