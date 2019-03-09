import { standardAttributes } from '@musical-patterns/pattern'
import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { MaterialStateKey, stopActions } from '../../../material'
import { SpecStateKey } from '../../../spec'
import { Action } from '../../../types'
import { PageName, PageStateKey } from '../../types'
import { adjustWindowActionsWithSideEffects } from '../adjustWindowActions'
import { closeRightColumn } from '../rightColumnActions'
import { HandleLogoClick, HandleLogoClickParameters } from './types'

const handleLogoClick: HandleLogoClick =
    async ({ dispatch, rightColumnOpen }: HandleLogoClickParameters): Promise<void> => {
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
                { type: MaterialStateKey.PERFORMER_DISABLED, data: true },
            ])

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        closeRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handleLogoClick,
}
