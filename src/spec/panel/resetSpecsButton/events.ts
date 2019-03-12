import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { resetActions } from './resetActions'
import { HandleSpecsResetParameters } from './types'

const handleSpecsReset: ({ dispatch, specs }: HandleSpecsResetParameters) => void =
    ({ dispatch, specs }: HandleSpecsResetParameters): void => {
        const actions: Action[] = resetActions(specs)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleSpecsReset,
}