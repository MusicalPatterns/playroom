import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../types'
import { resetActions } from './resetActions'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, spec }: HandleResetParameters) => void =
    ({ dispatch, spec }: HandleResetParameters): void => {
        const actions: Action[] = resetActions(spec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
