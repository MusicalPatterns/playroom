import { closeBrowser, openChrome, openTab } from 'puppet-strings'
import { APP_URL, DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, startServer, stopServer } from './support'

const PUPPETEER_TIMEOUT = 120000
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

const testGlobals = {}

beforeAll(async done => {
    await startServer()

    try {
        testGlobals.browser = await openChrome({ headless: true }, { timeout: PUPPETEER_TIMEOUT })
    }
    catch (e) {
        console.log('Could not open the browser in time.', e)
        fail('Could not open the browser in time. Please increase your Puppeteer timeout.')
        throw (e)
    }

    try {
        testGlobals.tab = await openTab(testGlobals.browser, APP_URL, { timeout: PUPPETEER_TIMEOUT })
    }
    catch (e) {
        console.log('Could not open the tab in time.', e)
        fail('Could not open the tab in time. Please increase your Puppeteer timeout.')
        throw (e)
    }

    try {
        testGlobals.page = testGlobals.tab.puppeteer.page
        await testGlobals.page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })
    }
    catch (e) {
        console.log('Could not set up the page in time', e)
        fail('Could not set up the page in time. Please increase your Puppeteer timeout.')
        throw (e)
    }

    done()
}, PUPPETEER_TIMEOUT)

afterAll(async done => {
    if (testGlobals.browser) {
        await closeBrowser(testGlobals.browser)
    }
    await stopServer()
    done()
}, PUPPETEER_TIMEOUT)

export {
    testGlobals,
}
