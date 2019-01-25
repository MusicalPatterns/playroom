import { testGlobals } from '../../setup'

const elementValue = selector => testGlobals.page.evaluate(selector => document.querySelector(selector).value, selector)

const elementExists = selector => testGlobals.page.evaluate(selector => !!document.querySelector(selector), selector)

const elementInnerText = selector => testGlobals.page.evaluate(selector => document.querySelector(selector).innerText, selector)

const elementChecked = selector => testGlobals.page.evaluate(selector => document.querySelector(selector).checked, selector)

export {
    elementExists,
    elementInnerText,
    elementValue,
    elementChecked,
}
