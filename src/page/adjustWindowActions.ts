import { Action } from '../types'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'
import { PageStateKey } from './types'

const adjustWindowActionsWithSideEffects: () => Action[] =
    (): Action[] => {
        window.scrollTo(0, 0)

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            return [ { type: PageStateKey.LEFT_COLUMN_OPEN, data: false } ]
        }

        return []
    }

export {
    adjustWindowActionsWithSideEffects,
}
