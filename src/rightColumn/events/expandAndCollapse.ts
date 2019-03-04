import { ActionType } from '../../root'
import { CaretClickHandlerParameters } from './types'

const caretClickHandler: (parameters: CaretClickHandlerParameters) => void =
    ({ dispatch, specPanelOpen }: CaretClickHandlerParameters): void => {
        dispatch({ type: ActionType.SET_SPEC_PANEL_OPEN, data: !specPanelOpen })
    }

export {
    caretClickHandler,
}
