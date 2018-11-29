import { OnUpdate } from '@musical-patterns/performer'
import { Time } from '@musical-patterns/utilities'
import { ActionType, store } from '../state'

const onPerformerUpdate: OnUpdate =
    (time: Time): void => {
        store.dispatch({ type: ActionType.SET_TIME, data: time })
    }

export {
    onPerformerUpdate,
}
