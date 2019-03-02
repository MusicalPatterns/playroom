import { ActionType } from '../../root'
import { DispatchAsProp } from '../../types'

const buildCaretClickHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: ActionType.TOGGLE_SPEC_PANEL_OPEN })
        }

export {
    buildCaretClickHandler,
}
