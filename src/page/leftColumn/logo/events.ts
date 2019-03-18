import { Configuration, Specs, standardConfigurations } from '@musical-patterns/pattern'
import { stop } from '@musical-patterns/performer'
import { KeyMap } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { IdStateKey, MaterialStateKey, SpecStateKey, stopActions } from '../../../pattern'
import { Action } from '../../../types'
import { PageName, PageStateKey } from '../../types'
import { closeRightColumn } from '../rightColumnActions'
import { maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions } from '../windowActions'
import { HandleLogoClick, HandleLogoClickParameters } from './types'

const handleLogoClick: HandleLogoClick =
    async ({ dispatch, rightColumnOpen }: HandleLogoClickParameters): Promise<void> => {
        const actions: Action[] = maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions()
            .concat([
                { type: PageStateKey.PAGE_NAME, data: PageName.ABOUT },
                { type: IdStateKey.PATTERN_ID, data: undefined },
            ])

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        closeRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handleLogoClick,
}
