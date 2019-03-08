import { pause, play, setTimePosition, stop } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { DispatchParameter } from '../../types'
import { stopActions } from '../stopActions'
import { PerformerStateKey } from '../types'

const buildHandlePauseClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: true })
            pause()
        }

const buildHandlePlayClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: false })
            play()
        }

const buildHandleRewindClickEvent: () => Promise<void> =
    async (): Promise<void> => {
        await setTimePosition(BEGINNING)
    }

const buildHandleStopClickEvent: (parameters: DispatchParameter) => () => Promise<void> =
    ({ dispatch }: DispatchParameter): () => Promise<void> =>
        async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions(stopActions())
            dispatch(batchedAction)
        }

export {
    buildHandlePlayClickEvent,
    buildHandlePauseClickEvent,
    buildHandleStopClickEvent,
    buildHandleRewindClickEvent,
}
