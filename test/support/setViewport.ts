import { page } from '../setup'
import {
    DESKTOP_VIEWPORT_HEIGHT,
    DESKTOP_VIEWPORT_WIDTH,
    MOBILE_VIEWPORT_HEIGHT,
    MOBILE_VIEWPORT_WIDTH,
} from './constants'

const simulateMobileViewport: () => Promise<void> =
    async (): Promise<void> =>
        page.setViewport({ width: MOBILE_VIEWPORT_WIDTH, height: MOBILE_VIEWPORT_HEIGHT })

const simulateDesktopViewport: () => Promise<void> =
    async (): Promise<void> =>
        page.setViewport({ width: DESKTOP_VIEWPORT_WIDTH, height: DESKTOP_VIEWPORT_HEIGHT })

export {
    simulateDesktopViewport,
    simulateMobileViewport,
}
