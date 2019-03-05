import { elementExists } from './generic'

const leftColumnIs: (openOrClosed: string) => Promise<void> =
    async (openOrClosed: string): Promise<void> => {
        expect(await elementExists(`#left-column.${openOrClosed}`))
            .toBeTruthy(`left column was not ${openOrClosed}`)
    }

export {
    leftColumnIs,
}
