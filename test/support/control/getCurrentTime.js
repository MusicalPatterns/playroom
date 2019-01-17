import { SecretSelectorsForTest } from '../../../src/types'
import { elementInnerText } from './checkElement'

const currentTime = async () => parseInt(await elementInnerText(`#${SecretSelectorsForTest.SECRET_TIMER}`))

export {
    currentTime,
}
