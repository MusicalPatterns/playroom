import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { buildResetActions } from './resetActions'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, spec }: HandleResetParameters) => void =
    ({ dispatch, spec }: HandleResetParameters): void => {
        const actions: Action[] = buildResetActions(spec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
