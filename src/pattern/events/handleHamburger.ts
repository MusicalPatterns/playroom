import { ActionType } from '../../root'
import { HandleHamburgerParameters } from './types'

const handleHamburger: (parameters: HandleHamburgerParameters) => void =
    ({ dispatch, patternsPanelOpen }: HandleHamburgerParameters): void => {
        dispatch({ type: ActionType.SET_PATTERNS_PANEL_OPEN, data: !patternsPanelOpen })
    }

export {
    handleHamburger,
}
