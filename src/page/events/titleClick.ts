import { standardSpecAttributes } from '@musical-patterns/pattern'
import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { PerformerStateKey, stopActions } from '../../performer'
import { Action } from '../../root'
import { SpecStateKey } from '../../spec'
import { PageStateKey } from '../state'
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
                { type: PageStateKey.PAGE_NAME, data: PageName.ABOUT },
                { type: SpecStateKey.INITIAL_SPEC, data: {} },
                { type: SpecStateKey.DISPLAYED_SPEC, data: {} },
                { type: SpecStateKey.SPEC_VALIDATION_RESULTS, data: {} },
                { type: SpecStateKey.SUBMITTED_SPEC, data: {} },
                { type: SpecStateKey.SPEC_ATTRIBUTES, data: standardSpecAttributes },
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
