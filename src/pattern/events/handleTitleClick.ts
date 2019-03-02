import { stop } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { DispatchAsProp } from '../../types'
import { Page } from '../types'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'

const buildTitleClickHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        async (): Promise<void> => {
            await stop()

            const actions: Action[] = [
                { type: ActionType.SET_PAUSED, data: true },
                { type: ActionType.SET_TIME_POSITION, data: BEGINNING },
                { type: ActionType.SET_PAGE, data: Page.ABOUT },
                { type: ActionType.SET_SUBMITTED_SPEC, data: {} },
                { type: ActionType.SET_DISPLAYED_SPEC, data: {} },
                { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: {} },
                { type: ActionType.SET_INITIAL_SPEC, data: {} },
                { type: ActionType.SET_PATTERN_ID, data: undefined },
                { type: ActionType.SET_SPEC_ATTRIBUTES, data: undefined },
                { type: ActionType.SET_VALIDATION_FUNCTION, data: undefined },
                { type: ActionType.SET_PRESETS, data: undefined },
            ]

            if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
                actions.push({ type: ActionType.SET_SIDE_PANEL_OPEN, data: false })
            }
            window.scrollTo(0, 0)

            const batchedAction: BatchAction = batchActions(actions)
            dispatch(batchedAction)
        }

export {
    buildTitleClickHandler,
}
