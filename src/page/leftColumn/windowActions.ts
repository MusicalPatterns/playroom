import { Thunk } from '@musical-patterns/utilities'
import { Action } from '../../types'
import { PageStateKey } from '../types'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'

const maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions: Thunk<Action[]> =
    (): Action[] => {
        window.scrollTo(0, 0)

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            return [ { type: PageStateKey.LEFT_COLUMN_OPEN, data: false } ]
        }

        return []
    }

export {
    maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions,
}
