// tslint:disable:no-any

import { page } from '../../setup'

const elementValue: (selector: string) => Promise<any> =
    async (selector: string): Promise<any> =>
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).value,
            selector,
        )

const elementExists: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        page.evaluate(
            (slctr: string) =>
                !!document.querySelector(slctr),
            selector,
        )

const elementInnerText: (selector: string) => Promise<string> =
    async (selector: string): Promise<string> =>
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).innerText,
            selector,
        )

const elementChecked: (selector: string) => Promise<boolean> =
    async (selector: string): Promise<boolean> =>
        page.evaluate(
            (slctr: string) =>
                // @ts-ignore
                // tslint:disable-next-line:no-unsafe-any
                document.querySelector(slctr).checked,
            selector,
        )

const elementCount: (selector: string) => Promise<number> =
    async (selector: string): Promise<number> =>
        page.evaluate(
            (slctr: string) =>
                document.querySelectorAll(slctr).length,
            selector,
        )

const elementIds: (selector: string) => Promise<string[]> =
    async (selector: string): Promise<string[]> =>
        page.evaluate(
            (slctr: string) =>
                // tslint:disable-next-line:no-unsafe-any
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
