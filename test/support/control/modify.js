import { clickElement, fillInElement } from 'puppet-strings'
import { VALID_TEST_MODIFICATION } from '../constants'
import { press } from './keyboard'

const modify = async input => {
    await fillInElement(input, VALID_TEST_MODIFICATION)
    await clickElement(input)
    await press('Enter')
}

export {
    modify,
}
