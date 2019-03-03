import { doAsync } from '@musical-patterns/utilities'
import { ActionType } from '../../../root'
import { ToggleRightColumnOpenParameters } from './types'

const openRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (!rightColumnOpen) {
            doAsync(() => {
                dispatch({ type: ActionType.SET_RIGHT_COLUMN_OPEN, data: true })
            })
        }
    }

const closeRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (rightColumnOpen) {
            doAsync(() => {
                dispatch({ type: ActionType.SET_RIGHT_COLUMN_OPEN, data: false })
            })
        }
    }

export {
    closeRightColumn,
    openRightColumn,
}
