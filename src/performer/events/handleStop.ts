import { stop } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { DispatchAsProp } from '../../types'

const buildStopHandler: (parameters: DispatchAsProp) => () => Promise<void> =
    ({ dispatch }: DispatchAsProp): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_PAUSED, data: true },
                { type: ActionType.SET_TIME_POSITION, data: BEGINNING },
            ])
            dispatch(batchedAction)
        }

export {
    buildStopHandler,
}
