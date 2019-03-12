import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { DispatchParameter } from '../../../types'
import { stopActions } from '../stopActions'

const computeHandleStopClickEvent: (parameters: DispatchParameter) => () => Promise<void> =
    ({ dispatch }: DispatchParameter): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions(stopActions())
            dispatch(batchedAction)
        }

export {
    computeHandleStopClickEvent,
}
