import { clickElement, fillInElement } from 'puppet-strings'
import { TEST_MODIFICATION } from '../constants'
import { press } from './keyboard'

const modify = async input => {
    await fillInElement(input, TEST_MODIFICATION)
    await clickElement(input)
    await press('Enter')
}

export {
    modify,
}
