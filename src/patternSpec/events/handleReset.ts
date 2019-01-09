import { PatternSpec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action } from '../../root'
import { buildResetActions } from './resetActions'
import { HandleResetParameters } from './types'

const handleReset: ({ dispatch, patternId, patterns }: HandleResetParameters) => void =
    ({ dispatch, patternId, patterns }: HandleResetParameters): void => {
        const patternSpec: PatternSpec = patterns[ patternId ].spec
        const actions: Action[] = buildResetActions(patternSpec)
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleReset,
}
