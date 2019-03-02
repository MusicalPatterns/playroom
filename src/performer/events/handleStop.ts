import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { DispatchAsProp } from '../../types'
import { stopActions } from './helpers'

const buildStopHandler: (parameters: DispatchAsProp) => () => Promise<void> =
    ({ dispatch }: DispatchAsProp): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions(stopActions())
            dispatch(batchedAction)
        }

export {
    buildStopHandler,
}
