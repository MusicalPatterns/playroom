import { closeBrowser, openChrome, openTab } from 'puppet-strings'
import { APP_URL, DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, startServer, stopServer } from './support'

const INTEGRATION_TEST_TIMEOUT = 60000
jasmine.DEFAULT_TIMEOUT_INTERVAL = INTEGRATION_TEST_TIMEOUT

const testGlobals = {}

beforeAll(async done => {
    await startServer()
    testGlobals.browser = await openChrome()
    testGlobals.tab = await openTab(testGlobals.browser, APP_URL, { timeout: INTEGRATION_TEST_TIMEOUT })
    if (!testGlobals.tab) {
        fail('Could not open the tab in time. Please increase your Puppeteer timeout.')
        done()
    }
    testGlobals.page = testGlobals.tab.puppeteer.page
    await testGlobals.page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })
    done()
}, INTEGRATION_TEST_TIMEOUT)

afterAll(async done => {
    await closeBrowser(testGlobals.browser)
    await stopServer()
    done()
}, INTEGRATION_TEST_TIMEOUT)

export {
    testGlobals,
}
