import { OnUpdate } from '@musical-patterns/performer'
import { Ms } from '@musical-patterns/utilities'
import { ActionType, store } from '../../root'

const onPerformerUpdate: OnUpdate =
    (timePosition: Ms): void => {
        store.dispatch({ type: ActionType.SET_TIME_POSITION, data: timePosition })
    }

export {
    onPerformerUpdate,
}
