import { SpecStateKey } from '../../types'
import { HandleSpecPanelHeaderClickParameters } from './types'

const handleSpecPanelHeaderClick: (parameters: HandleSpecPanelHeaderClickParameters) => void =
    ({ dispatch, specPanelOpen }: HandleSpecPanelHeaderClickParameters): void => {
        dispatch({ type: SpecStateKey.SPEC_PANEL_OPEN, data: !specPanelOpen })
    }

export {
    handleSpecPanelHeaderClick,
}
