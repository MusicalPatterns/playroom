import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'

const loseFocus = async () => {
    const anythingElse = await findElement(testGlobals.tab, `h1`)
    await clickElement(anythingElse)
}

export {
    loseFocus,
}
