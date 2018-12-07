import { evalInTab } from 'puppet-strings'
import { testGlobals } from '../../setup'

const elementValue = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return document.querySelector(selector).value`)

const elementExists = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return !!document.querySelector(selector)`)

const elementInnerText = selector => evalInTab(testGlobals.tab, [ selector ], `[selector] = arguments; return document.querySelector(selector).innerText`)

export {
    elementExists,
    elementInnerText,
    elementValue,
}
