import * as puppeteer from 'puppeteer'
import { APP_URL, DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH, startServer, stopServer } from './support'

const PUPPETEER_TIMEOUT: number = 100000
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

let browser: puppeteer.Browser
let page: puppeteer.Page

beforeAll(
    async (done: DoneFn) => {
        await startServer()

        browser = await puppeteer.launch({ headless: true, timeout: PUPPETEER_TIMEOUT })
        page = await browser.newPage()

        await page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })
        await page.goto(APP_URL, { timeout: PUPPETEER_TIMEOUT })

        done()
    },
    PUPPETEER_TIMEOUT,
)

afterAll(
    async (done: DoneFn) => {
        if (browser) {
            await browser.close()
        }
        await stopServer()
        done()
    },
    PUPPETEER_TIMEOUT,
)

export {
    page,
}
