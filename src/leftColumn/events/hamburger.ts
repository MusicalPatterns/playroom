import { ActionType } from '../../root'
import { HandleHamburgerParameters } from './types'

const handleHamburger: (parameters: HandleHamburgerParameters) => void =
    ({ dispatch, leftColumnOpen }: HandleHamburgerParameters): void => {
        dispatch({ type: ActionType.SET_LEFT_COLUMN_OPEN, data: !leftColumnOpen })
    }

export {
    handleHamburger,
}
