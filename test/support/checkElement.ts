// tslint:disable:no-any

import { page } from '../setup'

const elementValue: (selector: string) => Promise<any> =
    async (selector: string): Promise<any> =>
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                document.querySelector(slctr).value,
            selector,
        )

const elementExists: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        // @ts-ignore
        page.evaluate(
            (slctr: string) =>
                !!document.querySelector(slctr),
            selector,
        )

const elementInnerText: (selector: string) => Promise<string> =
    async (selector: string): Promise<string> =>
        // @ts-ignore
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                document.querySelector(slctr).innerText,
            selector,
        )

const elementChecked: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        // @ts-ignore
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                document.querySelector(slctr).checked,
            selector,
        )

const elementCount: (selector: string) => Promise<number> =
    async (selector: string): Promise<number> =>
        // @ts-ignore
        page.evaluate(
            (slctr: string) =>
                document.querySelectorAll(slctr).length,
            selector,
        )

const elementIds: (selector: string) => Promise<string[]> =
    async (selector: string): Promise<string[]> =>
        // @ts-ignore
        page.evaluate(
            (slctr: string) =>
                Array.from(document.querySelectorAll(slctr))
                    .map((element: Element) => element.id),
            selector,
        )

export {
    elementExists,
    elementInnerText,
    elementValue,
    elementChecked,
    elementCount,
    elementIds,
}
