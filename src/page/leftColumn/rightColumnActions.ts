import { doAsync } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { Action } from '../../types'
import { PageStateKey } from '../types'
import { ToggleRightColumnOpenParameters } from './types'

const allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate: (fn: VoidFunction) => void = doAsync

const openRightColumn: (parameters: { dispatch: Dispatch<Action>, rightColumnOpen: boolean }) => void =
    ({ rightColumnOpen, dispatch }: ToggleRightColumnOpenParameters): void => {
        if (!rightColumnOpen) {
            allowNewComponentsToMountUnderPreviousRightColumnStateSoThatTheyAnimate(() => {
                dispatch({ type: PageStateKey.RIGHT_COLUMN_OPEN, data: true })
            })
        }
    }

const closeRightColumn: (parameters: { dispatch: Dispatch<Action>, rightColumnOpen: boolean }) => void =
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
