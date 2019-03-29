import { Dispatch } from 'redux'
import { Action } from '../../../../types'
import { SpecStateKey } from '../../types'
import { HandleSpecPanelHeaderClickParameters } from './types'

const handleSpecPanelHeaderClick: (parameters: { dispatch: Dispatch<Action>, specPanelOpen: boolean }) => void =
    ({ dispatch, specPanelOpen }: HandleSpecPanelHeaderClickParameters): void => {
        dispatch({ type: SpecStateKey.SPEC_PANEL_OPEN, data: !specPanelOpen })
    }

export {
    handleSpecPanelHeaderClick,
}
