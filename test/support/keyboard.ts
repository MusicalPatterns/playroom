import { page } from '../setup'

const press: (key: string) => Promise<void> =
    async (key: string): Promise<void> =>
        page.keyboard.press(key)

export {
    press,
}
