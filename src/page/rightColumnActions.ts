import { doAsync } from '@musical-patterns/utilities'
import { PageStateKey, ToggleRightColumnOpenParameters } from './types'

const allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate: (fn: VoidFunction) => void = doAsync

const openRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (!rightColumnOpen) {
            allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate(() => {
                dispatch({ type: PageStateKey.RIGHT_COLUMN_OPEN, data: true })
            })
        }
    }

const closeRightColumn: (parameters: ToggleRightColumnOpenParameters) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (rightColumnOpen) {
            allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate(() => {
                dispatch({ type: PageStateKey.RIGHT_COLUMN_OPEN, data: false })
            })
        }
    }

export {
    closeRightColumn,
    openRightColumn,
}
