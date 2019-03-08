import { standardAttributes } from '@musical-patterns/pattern'
import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { PerformerStateKey, stopActions } from '../../../performer'
import { SpecStateKey } from '../../../spec'
import { Action } from '../../../types'
import { PageName, PageStateKey } from '../../types'
import { adjustWindowActionsWithSideEffects } from '../adjustWindowActions'
import { closeRightColumn } from '../rightColumnActions'
import { TitleClickEventHandler, TitleClickEventHandlerParameters } from './types'

const handleTitleClick: TitleClickEventHandler =
    async ({ dispatch, titleClickEventParameters }: TitleClickEventHandlerParameters): Promise<void> => {
        const { rightColumnOpen } = titleClickEventParameters
        await stop()

        const actions: Action[] = adjustWindowActionsWithSideEffects()
            .concat(stopActions())
            .concat([
                { type: PageStateKey.PAGE_NAME, data: PageName.ABOUT },
                { type: SpecStateKey.INITIAL_SPEC, data: {} },
                { type: SpecStateKey.DISPLAYED_SPEC, data: {} },
                { type: SpecStateKey.VALIDATION_RESULTS, data: {} },
                { type: SpecStateKey.SUBMITTED_SPEC, data: {} },
                { type: SpecStateKey.ATTRIBUTES, data: standardAttributes },
                { type: SpecStateKey.VALIDATION_FUNCTION, data: undefined },
                { type: SpecStateKey.PRESETS, data: undefined },
                { type: PageStateKey.PATTERN_ID, data: undefined },
                { type: PerformerStateKey.PERFORMER_DISABLED, data: true },
            ])

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        closeRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handleTitleClick,
}
