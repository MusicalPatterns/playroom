import { BEGINNING } from '@musical-patterns/utilities'
import { Action } from '../types'
import { PerformerStateKey } from './types'

const stopActions: () => Action[] =
    (): Action[] => [
        { type: PerformerStateKey.PAUSED, data: true },
        { type: PerformerStateKey.TIME_POSITION, data: BEGINNING },
    ]

export {
    stopActions,
}
