import { doAsync } from '@musical-patterns/utilities'
import { ActionType } from '../../../root'
import { ToggleRightPanelOpenParameters } from './types'

const openRightPanel: (parameters: ToggleRightPanelOpenParameters) => void =
    ({ rightPanelOpen, dispatch }: ToggleRightPanelOpenParameters): void => {
        if (!rightPanelOpen) {
            doAsync(() => {
                dispatch({ type: ActionType.SET_RIGHT_PANEL_OPEN, data: true })
            })
        }
    }

const closeRightPanel: (parameters: ToggleRightPanelOpenParameters) => void =
    ({ rightPanelOpen, dispatch }: ToggleRightPanelOpenParameters): void => {
        if (rightPanelOpen) {
            doAsync(() => {
                dispatch({ type: ActionType.SET_RIGHT_PANEL_OPEN, data: false })
            })
        }
    }

export {
    closeRightPanel,
    openRightPanel,
}
