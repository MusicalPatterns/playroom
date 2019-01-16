import { navigate } from 'puppet-strings'
import { testGlobals } from '../../setup'
import { APP_URL } from '../constants'
import { selectOtherTestPattern, selectTestPattern } from './selectTestPattern'

const refresh = async () => {
    await navigate(testGlobals.tab, APP_URL)
}

const refreshWithTestPatternSelected = async () => {
    await selectOtherTestPattern()
    await selectTestPattern()
}

export {
    refresh,
    refreshWithTestPatternSelected,
}
