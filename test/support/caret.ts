import { ElementHandle, JSHandle } from 'puppeteer'
import { findElement } from './generic'

const openSpecControlsIfNotOpen: () => Promise<void> =
    async (): Promise<void> => {
        const specPanel: ElementHandle = await findElement('#spec-panel')
        const specPanelClassNameHandle: JSHandle = await specPanel.getProperty('className')
        const specPanelClassName: string = await specPanelClassNameHandle.jsonValue() as string

        if (specPanelClassName === 'open') {
            return
        }

        const caret: ElementHandle = await findElement('#spec-panel #caret')
        await caret.click()
    }

export {
    openSpecControlsIfNotOpen,
}
