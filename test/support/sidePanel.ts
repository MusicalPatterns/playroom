import { elementExists } from './generic'

const sidePanelIs: (openOrClosed: string) => Promise<void> =
    async (openOrClosed: string): Promise<void> => {
        expect(await elementExists(`#side-panel.${openOrClosed}`))
            .toBeTruthy()
    }

export {
    sidePanelIs,
}
