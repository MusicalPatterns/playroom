import {
    clickElement as utilitiesClickElement,
    deleteCharacterFromInput as utilitiesDeleteCharacterFromInput,
    elementAttribute as utilitiesElementAttribute,
    elementChecked as utilitiesElementChecked,
    elementCount as utilitiesElementCount,
    elementExists as utilitiesElementExists,
    elementIds as utilitiesElementIds,
    elementInnerText as utilitiesElementInnerText,
    elementValue as utilitiesElementValue,
    findElement as utilitiesFindElement,
    HtmlValue,
    loseFocus as utilitiesLoseFocus,
    press as utilitiesPress,
    selectOption as utilitiesSelectOption,
    simulateDesktopViewport as utilitiesSimulateDesktopViewport,
    simulateMobileViewport as utilitiesSimulateMobileViewport,
} from '@musical-patterns/utilities'
import { ElementHandle } from 'puppeteer'
import { page } from '../setup'

const elementValue: (selector: string) => Promise<HtmlValue> =
    async (selector: string): Promise<HtmlValue> =>
        utilitiesElementValue(page, selector)

const elementExists: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        utilitiesElementExists(page, selector)

const elementInnerText: (selector: string) => Promise<string> =
    async (selector: string): Promise<string> =>
        utilitiesElementInnerText(page, selector)

const elementChecked: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        utilitiesElementChecked(page, selector)

const elementCount: (selector: string) => Promise<number> =
    async (selector: string): Promise<number> =>
        utilitiesElementCount(page, selector)

const elementIds: (selector: string) => Promise<string[]> =
    async (selector: string): Promise<string[]> =>
        utilitiesElementIds(page, selector)

const elementAttribute: (selector: string, attribute: string) => Promise<unknown> =
    async (selector: string, attribute: string): Promise<unknown> =>
        utilitiesElementAttribute(page, selector, attribute)

const findElement: (selector: string) => Promise<ElementHandle> =
    async (selector: string): Promise<ElementHandle> =>
        utilitiesFindElement(page, selector)

const press: (key: string) => Promise<void> =
    async (key: string): Promise<void> =>
        utilitiesPress(page, key)

const loseFocus: (selector?: string) => Promise<void> =
    async (selector?: string): Promise<void> =>
        utilitiesLoseFocus(page, selector)

const selectOption: (selectSelector: string, optionValue: string) => Promise<string[]> =
    async (selectSelector: string, optionValue: string): Promise<string[]> =>
        utilitiesSelectOption(page, selectSelector, optionValue)

const simulateMobileViewport: () => Promise<void> =
    async (): Promise<void> =>
        utilitiesSimulateMobileViewport(page)

const simulateDesktopViewport: () => Promise<void> =
    async (): Promise<void> =>
        utilitiesSimulateDesktopViewport(page)

const clickElement: (selector: string) => Promise<void> =
    async (selector: string): Promise<void> =>
        utilitiesClickElement(page, selector)

const deleteCharacterFromInput: (selector: string) => Promise<void> =
    async (selector: string): Promise<void> =>
        utilitiesDeleteCharacterFromInput(page, selector)

export {
    elementValue,
    elementExists,
    elementInnerText,
    elementChecked,
    elementCount,
    elementIds,
    elementAttribute,
    findElement,
    press,
    loseFocus,
    selectOption,
    simulateMobileViewport,
    simulateDesktopViewport,
    clickElement,
    deleteCharacterFromInput,
}
