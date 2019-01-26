import { page } from '../../setup'
import { DEFAULT_VIEWPORT_HEIGHT, DEFAULT_VIEWPORT_WIDTH } from '../constants'

const simulateMobileViewport: () => Promise<void> =
    async (): Promise<void> =>
        page.setViewport({ width: 800, height: DEFAULT_VIEWPORT_HEIGHT })

const simulateDesktopViewport: () => Promise<void> =
    async (): Promise<void> =>
        page.setViewport({ width: DEFAULT_VIEWPORT_WIDTH, height: DEFAULT_VIEWPORT_HEIGHT })

export {
    simulateDesktopViewport,
    simulateMobileViewport,
}
