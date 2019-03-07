import { OnUpdate } from '@musical-patterns/performer'
import { Ms } from '@musical-patterns/utilities'
import { store } from '../../root'
import { PerformerStateKey } from '../state'

const onPerformerUpdate: OnUpdate =
    (timePosition: Ms): void => {
        store.dispatch({ type: PerformerStateKey.TIME_POSITION, data: timePosition })
    }

export {
    onPerformerUpdate,
}
