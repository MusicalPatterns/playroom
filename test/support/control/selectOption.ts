import { page } from '../../setup'

const selectOption: (selectSelector: string, optionValue: string) => Promise<string[]> =
    async (selectSelector: string, optionValue: string): Promise<string[]> =>
        page.select(selectSelector, optionValue)

export {
    selectOption,
}
