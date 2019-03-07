import { BEGINNING } from '@musical-patterns/utilities'
import { Action } from '../../../root'
import { PerformerStateKey } from '../../state'

const stopActions: () => Action[] =
    (): Action[] => [
        { type: PerformerStateKey.PAUSED, data: true },
        { type: PerformerStateKey.TIME_POSITION, data: BEGINNING },
    ]

export {
    stopActions,
}
