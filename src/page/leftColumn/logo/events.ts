import { standardConfigurations } from '@musical-patterns/pattern'
import { stop } from '@musical-patterns/performer'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { IdStateKey, MaterialStateKey, SpecStateKey, stopActions } from '../../../pattern'
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
                { type: SpecStateKey.INITIAL_SPECS, data: {} },
                { type: SpecStateKey.DISPLAYED_SPECS, data: {} },
                { type: SpecStateKey.VALIDATIONS, data: {} },
                { type: SpecStateKey.SUBMITTED_SPECS, data: {} },
                { type: SpecStateKey.CONFIGURATIONS, data: standardConfigurations },
                { type: SpecStateKey.COMPUTE_VALIDATIONS, data: undefined },
                { type: SpecStateKey.PRESETS, data: undefined },
                { type: IdStateKey.PATTERN_ID, data: undefined },
                { type: MaterialStateKey.PERFORMER_DISABLED, data: true },
            ])

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        closeRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handleLogoClick,
}
