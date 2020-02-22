import { setTime } from '@musical-patterns/material'
import { Specs } from '@musical-patterns/spec'
import { BEGINNING, doAsync } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../../../types'
import { resetActions } from './resetActions'
import { HandleSpecsResetParameters } from './types'

const handleSpecsReset:
    (parameters: { dispatch: Dispatch<Action>, restartOnModify: boolean, specs: Specs }) => void =
    ({ dispatch, specs, restartOnModify }: HandleSpecsResetParameters): void => {
        const actions: Action[] = resetActions(specs)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        doAsync(async (): Promise<void> => {
            if (restartOnModify) {
                await setTime(BEGINNING)
            }
        })
    }

export {
    handleSpecsReset,
}
