import { ElementHandle, JSHandle } from 'puppeteer'
import { clickElement, findElement } from './generic'

const openSpecControlsIfNotOpen: () => Promise<void> =
    async (): Promise<void> => {
        const specPanel: ElementHandle = await findElement('#spec-panel')
        const specPanelClassNameHandle: JSHandle = await specPanel.getProperty('className')
        const specPanelClassName: string = await specPanelClassNameHandle.jsonValue() as string

        if (specPanelClassName === 'open') {
            return
        }

        await clickElement('#spec-panel #caret')
    }

export {
    openSpecControlsIfNotOpen,
}
