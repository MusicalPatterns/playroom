import { togglePaused } from '@musical-patterns/performer'
import { Dispatch } from 'redux'
import { ActionType } from '../../root'

const buildTogglePausedHandler: (dispatch: Dispatch) => VoidFunction =
    (dispatch: Dispatch): VoidFunction =>
        (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
            togglePaused()
        }

export {
    buildTogglePausedHandler,
}
