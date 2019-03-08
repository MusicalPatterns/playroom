import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { resetActions } from './resetActions'
import { HandleSpecResetParameters } from './types'

const handleSpecReset: ({ dispatch, spec }: HandleSpecResetParameters) => void =
    ({ dispatch, spec }: HandleSpecResetParameters): void => {
        const actions: Action[] = resetActions(spec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleSpecReset,
}
