import { pause, play, setTimePosition, stop } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { DispatchAsProp } from '../../types'
import { stopActions } from '../stopActions'
import { PerformerStateKey } from '../types'

const buildPauseHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: true })
            pause()
        }

const buildPlayHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: false })
            play()
        }

const handleRewind: () => Promise<void> =
    async (): Promise<void> => {
        await setTimePosition(BEGINNING)
    }

const buildStopHandler: (parameters: DispatchAsProp) => () => Promise<void> =
    ({ dispatch }: DispatchAsProp): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions(stopActions())
            dispatch(batchedAction)
        }

export {
    buildPlayHandler,
    buildPauseHandler,
    buildStopHandler,
    handleRewind,
}
