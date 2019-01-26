import { testGlobals } from '../../setup'

const press: (key: string) => Promise<void> =
    async (key: string): Promise<void> =>
        testGlobals.page.keyboard.press(key)

export {
    press,
}
