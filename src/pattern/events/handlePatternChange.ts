import { AnyPatternSpec, AnyPatternSpecData } from '@musical-patterns/pattern'
import { setTime, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, doAsync } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildResetActions, StringifiedPatternSpec, stringifyPatternSpec } from '../../patternSpec'
import { Action, ActionType } from '../../root'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        togglePaused()

        const specData: AnyPatternSpecData = patterns[ patternId ].specData
        const initialSpec: AnyPatternSpec = specData.specs.initial
        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(initialSpec)

        const actions: Action[] = buildResetActions(stringifiedPatternSpec)
            .concat([
                { type: ActionType.SET_DEFAULT_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_PATTERN_ID, data: patternId },
                { type: ActionType.SET_PATTERN_SPEC_ATTRIBUTES, data: specData.attributes },
            ])

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            actions.push({ type: ActionType.SET_PATTERNS_PANEL_OPEN, data: false })
        }

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
