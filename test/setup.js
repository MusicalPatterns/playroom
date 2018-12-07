import { closeBrowser, openChrome, openTab } from 'puppet-strings'
import { startTestPlayroom, stopTestPlayroom } from './support'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

const testGlobals = {}

beforeAll(async done => {
    await startTestPlayroom()
    testGlobals.browser = await openChrome({ headless: false })
    testGlobals.tab = await openTab(testGlobals.browser, 'http://localhost:8081')
    testGlobals.page = testGlobals.tab.puppeteer.page
    done()
}, 60000)

afterAll(async done => {
    await closeBrowser(testGlobals.browser)
    await stopTestPlayroom()
    done()
})

export {
    testGlobals,
}
