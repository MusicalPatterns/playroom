import * as React from 'react'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { IdStateKey } from '../../../pattern'
import { Action } from '../../../types'
import { PageName, PageStateKey } from '../../types'
import { closeRightColumn } from '../rightColumnActions'
import { maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions } from '../windowActions'
import { HandleLogoClickParameters } from './types'

const handleLogoClick: (parameters: {
    dispatch: Dispatch<Action>,
    event: React.SyntheticEvent,
    rightColumnOpen: boolean,
}) => Promise<void> =
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
