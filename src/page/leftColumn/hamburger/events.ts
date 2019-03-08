import { PageStateKey } from '../../types'
import { HandleHamburgerClickParameters } from './types'

const handleHamburgerClick: (parameters: HandleHamburgerClickParameters) => void =
    ({ dispatch, leftColumnOpen }: HandleHamburgerClickParameters): void => {
        dispatch({ type: PageStateKey.LEFT_COLUMN_OPEN, data: !leftColumnOpen })
    }

export {
    handleHamburgerClick,
}
