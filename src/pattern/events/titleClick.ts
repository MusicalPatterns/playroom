import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { stopActions } from '../../performer'
import { Action, ActionType } from '../../root'
import { PageName } from '../types'
import { adjustWindowActionsWithSideEffects, closeRightColumn } from './helpers'
import { TitleClickEventHandler, TitleClickEventHandlerParameters } from './types'

const handleTitleClick: TitleClickEventHandler =
    async ({ dispatch, titleClickEventParameters }: TitleClickEventHandlerParameters): Promise<void> => {
        const { rightColumnOpen } = titleClickEventParameters
        await stop()

        const actions: Action[] = adjustWindowActionsWithSideEffects()
            .concat(stopActions())
            .concat([
                { type: ActionType.SET_PAGE_NAME, data: PageName.ABOUT },
                { type: ActionType.SET_SUBMITTED_SPEC, data: {} },
                { type: ActionType.SET_DISPLAYED_SPEC, data: {} },
                { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: {} },
                { type: ActionType.SET_INITIAL_SPEC, data: {} },
                { type: ActionType.SET_PATTERN_ID, data: undefined },
                { type: ActionType.SET_SPEC_ATTRIBUTES, data: undefined },
                { type: ActionType.SET_VALIDATION_FUNCTION, data: undefined },
                { type: ActionType.SET_PRESETS, data: undefined },
                { type: ActionType.SET_PERFORMER_DISABLED, data: true },
            ])

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        closeRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handleTitleClick,
}
