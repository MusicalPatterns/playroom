import { doAsync } from '@musical-patterns/utilities'
import { ActionType } from '../../../root'
import { ToggleRightColumnOpenParameters } from './types'

const allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate: (fn: VoidFunction) => void = doAsync

const openRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (!rightColumnOpen) {
            allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate(() => {
                dispatch({ type: ActionType.SET_RIGHT_COLUMN_OPEN, data: true })
            })
        }
    }

const closeRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (rightColumnOpen) {
            allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate(() => {
                dispatch({ type: ActionType.SET_RIGHT_COLUMN_OPEN, data: false })
            })
        }
    }

export {
    closeRightColumn,
    openRightColumn,
}
