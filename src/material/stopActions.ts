import { BEGINNING } from '@musical-patterns/utilities'
import { Action } from '../types'
import { MaterialStateKey } from './types'

const stopActions: () => Action[] =
    (): Action[] => [
        { type: MaterialStateKey.PAUSED, data: true },
        { type: MaterialStateKey.TIME_POSITION, data: BEGINNING },
    ]

export {
    stopActions,
}
