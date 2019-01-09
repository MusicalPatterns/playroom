import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'

const reset = async () => {
    const reset = await findElement(testGlobals.tab, '#reset')
    await clickElement(reset)
}

export {
    reset,
}
