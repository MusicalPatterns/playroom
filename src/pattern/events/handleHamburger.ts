import { ActionType } from '../../root'
import { HandleHamburgerParameters } from './types'

const handleHamburger: (parameters: HandleHamburgerParameters) => void =
    ({ dispatch, sidePanelOpen }: HandleHamburgerParameters): void => {
        dispatch({ type: ActionType.SET_SIDE_PANEL_OPEN, data: !sidePanelOpen })
    }

export {
    handleHamburger,
}
