import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { buildResetActions } from './resetActions'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, defaultPatternSpec }: HandleResetParameters) => void =
    ({ dispatch, defaultPatternSpec }: HandleResetParameters): void => {
        const actions: Action[] = buildResetActions(defaultPatternSpec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
