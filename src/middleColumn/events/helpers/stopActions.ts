import { BEGINNING } from '@musical-patterns/utilities'
import { Action, ActionType } from '../../../root'

const stopActions: () => Action[] =
    (): Action[] => [
        { type: ActionType.SET_PAUSED, data: true },
        { type: ActionType.SET_TIME_POSITION, data: BEGINNING },
    ]

export {
    stopActions,
}
