import { SpecStateKey } from '../../types'
import { CaretClickHandlerParameters } from './types'

const caretClickHandler: (parameters: CaretClickHandlerParameters) => void =
    ({ dispatch, specPanelOpen }: CaretClickHandlerParameters): void => {
        dispatch({ type: SpecStateKey.SPEC_PANEL_OPEN, data: !specPanelOpen })
    }

export {
    caretClickHandler,
}
