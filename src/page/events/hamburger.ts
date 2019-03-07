import { PageStateKey } from '../state'
import { HandleHamburgerParameters } from './types'

const handleHamburger: (parameters: HandleHamburgerParameters) => void =
    ({ dispatch, leftColumnOpen }: HandleHamburgerParameters): void => {
        dispatch({ type: PageStateKey.LEFT_COLUMN_OPEN, data: !leftColumnOpen })
    }

export {
    handleHamburger,
}
