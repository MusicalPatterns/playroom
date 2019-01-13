import { PatternSpec } from '@musical-patterns/pattern'
import { setTime, togglePaused } from '@musical-patterns/performer'
import { ImmutableState, StateKeys } from '@musical-patterns/performer/dist/state'
import { BEGINNING, doAsync, to } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildResetActions, StringifiedPatternSpec, stringifyPatternSpec } from '../../patternSpec'
import { Action, ActionType } from '../../root'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        togglePaused()

        const patternSpec: PatternSpec = patterns[ patternId ].spec
        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
        const actions: Action[] = buildResetActions(stringifiedPatternSpec)
            .concat([
                { type: ActionType.SET_DEFAULT_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_PATTERN_ID, data: patternId },
            ])
        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        togglePaused()

        doAsync(async () => {
            await setTime(BEGINNING)
        })
 }

export {
    handlePatternChange,
}
