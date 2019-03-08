import { OnUpdate } from '@musical-patterns/performer'
import { Ms } from '@musical-patterns/utilities'
import { PerformerStateKey } from './performer'
import { store } from './store'

const onPerformerUpdate: OnUpdate =
    (timePosition: Ms): void => {
        store.dispatch({ type: PerformerStateKey.TIME_POSITION, data: timePosition })
    }

export {
    onPerformerUpdate,
}
