import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'

const loseFocus = async selector => {
    if (selector) {
        const element = await findElement(testGlobals.tab, selector)
        await clickElement(element)
    }

    const anythingElse = await findElement(testGlobals.tab, 'h1')
    await clickElement(anythingElse)
}

export {
    loseFocus,
}
