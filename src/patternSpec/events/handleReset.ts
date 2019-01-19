import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { buildResetActions } from './resetActions'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, patternSpec }: HandleResetParameters) => void =
    ({ dispatch, patternSpec }: HandleResetParameters): void => {
        const actions: Action[] = buildResetActions(patternSpec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
