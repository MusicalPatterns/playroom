import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, elementExists, selectTestPattern, sleep } from '../../support'

describe('hamburger', () => {
    it('collapses and expands the left panel', async done => {
        expect(elementExists('#patterns-panel.open'))
            .toBeTruthy()

        const hamburger = await findElement(testGlobals.tab, '#hamburger')
        await clickElement(hamburger)

        expect(elementExists('#patterns-panel.closed'))
            .toBeTruthy()

        await clickElement(hamburger)

        expect(elementExists('#patterns-panel.open'))
            .toBeTruthy()

        done()
    })


    it('collapses the panel when you select a pattern if the viewport is smaller than 1000px wide', async done => {
        await testGlobals.page.setViewport({ width: 800, height: DEFAULT_VIEWPORT_HEIGHT })

        expect(elementExists('#patterns-panel.open'))
            .toBeTruthy()

        await selectTestPattern()

        expect(elementExists('#patterns-panel.closed'))
            .toBeTruthy()

        await testGlobals.page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })
        const hamburger = await findElement(testGlobals.tab, '#hamburger')
        await clickElement(hamburger)

        done()
    })
})
