import { Dispatch } from 'redux'
import { Action } from '../../../types'
import { PageStateKey } from '../../types'
import { HandleHamburgerClickParameters } from './types'

const handleHamburgerClick: (parameters: { dispatch: Dispatch<Action>, leftColumnOpen: boolean }) => void =
    ({ dispatch, leftColumnOpen }: HandleHamburgerClickParameters): void => {
        dispatch({ type: PageStateKey.LEFT_COLUMN_OPEN, data: !leftColumnOpen })
    }

export {
    handleHamburgerClick,
}
