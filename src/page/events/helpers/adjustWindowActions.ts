import { Action, ActionType } from '../../../root'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from '../constants'

const adjustWindowActionsWithSideEffects: () => Action[] =
    (): Action[] => {
        window.scrollTo(0, 0)

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            return [ { type: ActionType.SET_LEFT_COLUMN_OPEN, data: false } ]
        }

        return []
    }

export {
    adjustWindowActionsWithSideEffects,
}
