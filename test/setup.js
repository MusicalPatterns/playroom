import { closeBrowser, openChrome, openTab } from 'puppet-strings'
import { APP_URL, startServer, stopServer } from './support'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

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
    console.log('about to stop server')
    await stopServer()
    console.log('stopped server')
    done()
}, 60000)

export {
    testGlobals,
}
