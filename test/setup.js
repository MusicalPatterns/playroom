import { closeBrowser, openChrome, openTab } from 'puppet-strings'
import { APP_URL, startServer, stopServer } from './support'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

const testGlobals = {}

beforeAll(async done => {
    await startServer()
    testGlobals.browser = await openChrome()
    testGlobals.tab = await openTab(testGlobals.browser, APP_URL)
    testGlobals.page = testGlobals.tab.puppeteer.page
    done()
}, 60000)

afterAll(async done => {
    await closeBrowser(testGlobals.browser)
    await stopServer()
    done()
})

export {
    testGlobals,
}
