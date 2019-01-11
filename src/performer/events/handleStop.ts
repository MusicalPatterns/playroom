import { stop } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'

const buildStopHandler: (dispatch: Dispatch) => () => Promise<void> =
    (dispatch: Dispatch): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_PAUSED, data: true },
                { type: ActionType.SET_TIME, data: BEGINNING },
            ])
            dispatch(batchedAction)
        }

export {
    buildStopHandler,
}
