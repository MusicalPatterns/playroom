import { clickElement, findElement } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { SPEC_OPTIONED_PROPERTY_ONE_KEY } from '../constants'
import { press } from './keyboard'

const submitSelectByPressingEnter = async () => {
    const select = await findElement(testGlobals.tab, `select#${SPEC_OPTIONED_PROPERTY_ONE_KEY}`)
    await clickElement(select)
    await press('Enter')
    await press('Enter')
}

export {
    submitSelectByPressingEnter,
}
