import { togglePaused } from '@musical-patterns/performer'
import { ActionType } from '../../root'
import { DispatchAsProp } from '../../types'

const buildTogglePausedHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
            togglePaused()
        }

export {
    buildTogglePausedHandler,
}
