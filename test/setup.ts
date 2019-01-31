import { logMessageToConsole } from '@musical-patterns/utilities'
import * as puppeteer from 'puppeteer'
import { APP_URL, DESKTOP_VIEWPORT_HEIGHT, DESKTOP_VIEWPORT_WIDTH, startServer, stopServer } from './support'

const PUPPETEER_TIMEOUT: number = 100000
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

let browser: puppeteer.Browser
let page: puppeteer.Page

beforeAll(
    async (done: DoneFn) => {
        try {
            const t0: number = performance.now()
            await startServer()
            const t1: number = performance.now()
            logMessageToConsole(`Starting the test server took ${Math.round(t1 - t0)} milliseconds.`)

            const t2: number = performance.now()
            browser = await puppeteer.launch({ headless: !process.env.headful, timeout: PUPPETEER_TIMEOUT })
            page = await browser.newPage()
            await page.setViewport({ width: DESKTOP_VIEWPORT_WIDTH, height: DESKTOP_VIEWPORT_HEIGHT })
            await page.goto(APP_URL, { timeout: PUPPETEER_TIMEOUT })
            const t3: number = performance.now()
            logMessageToConsole(`Starting puppeteer took ${Math.round(t3 - t2)} milliseconds.`)
        }
        catch (e) {
            logMessageToConsole('Error in setup: ', e)
        }

        done()
    },
    PUPPETEER_TIMEOUT,
)

afterAll(
    async (done: DoneFn) => {
        try {
            await browser.close()
            await stopServer()
        }
        catch (e) {
            logMessageToConsole('Error in setdown: ', e)
        }

        done()
    },
    PUPPETEER_TIMEOUT,
)

export {
    page,
}
