import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { stopActions } from '../../performer'
import { Action, ActionType } from '../../root'
import { DispatchAsProp } from '../../types'
import { Page } from '../types'
import { adjustWindowActionsWithSideEffects } from './helpers'

const buildTitleClickHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        async (): Promise<void> => {
            await stop()

            const actions: Action[] = adjustWindowActionsWithSideEffects()
                .concat(stopActions())
                .concat([
                    { type: ActionType.SET_PAGE, data: Page.ABOUT },
                    { type: ActionType.SET_SUBMITTED_SPEC, data: {} },
                    { type: ActionType.SET_DISPLAYED_SPEC, data: {} },
                    { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: {} },
                    { type: ActionType.SET_INITIAL_SPEC, data: {} },
                    { type: ActionType.SET_PATTERN_ID, data: undefined },
                    { type: ActionType.SET_SPEC_ATTRIBUTES, data: undefined },
                    { type: ActionType.SET_VALIDATION_FUNCTION, data: undefined },
                    { type: ActionType.SET_PRESETS, data: undefined },
                ])

            const batchedAction: BatchAction = batchActions(actions)
            dispatch(batchedAction)
        }

export {
    buildTitleClickHandler,
}
