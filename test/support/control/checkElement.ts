// tslint:disable:no-any

import { page, testGlobals } from '../../setup'
import { SPEC_ARRAYED_PROPERTY_KEY } from '../constants'

const elementValue: (selector: string) => Promise<any> =
    async (selector: string): Promise<any> =>
        testGlobals.page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).value,
            selector,
        )

const elementExists: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        testGlobals.page.evaluate(
            (slctr: string) =>
                !!document.querySelector(slctr),
            selector,
        )

const elementInnerText: (selector: string) => Promise<string> =
    async (selector: string): Promise<string> =>
        testGlobals.page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).innerText,
            selector,
        )

const elementChecked: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        testGlobals.page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).checked,
            selector,
        )

const elementCount: (selector: string) => Promise<number> =
    async (selector: string): Promise<number> =>
        testGlobals.page.evaluate(
            (slctr: string) =>
                document.querySelectorAll(slctr).length,
            selector,
        )

export {
    elementExists,
    elementInnerText,
    elementValue,
    elementChecked,
    elementCount,
}
