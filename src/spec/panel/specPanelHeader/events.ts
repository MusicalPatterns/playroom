import { SpecStateKey } from '../../types'
import { SpecPanelCaretClickHandlerParameters } from './types'

const specPanelCaretClickHandler: (parameters: SpecPanelCaretClickHandlerParameters) => void =
    ({ dispatch, specPanelOpen }: SpecPanelCaretClickHandlerParameters): void => {
        dispatch({ type: SpecStateKey.SPEC_PANEL_OPEN, data: !specPanelOpen })
    }

export {
    specPanelCaretClickHandler,
}
