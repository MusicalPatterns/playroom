import { PatternSpec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildResetActions } from '../../patternSpec'
import { Action, ActionType } from '../../root'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        const patternSpec: PatternSpec = patterns[ patternId ].spec
        const actions: Action[] = buildResetActions(patternSpec)
            .concat([ { type: ActionType.SET_PATTERN_ID, data: patternId } ])
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handlePatternChange,
}
