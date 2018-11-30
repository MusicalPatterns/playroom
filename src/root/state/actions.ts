import { PatternStateActionType } from '../../pattern'
import { PatternSpecStateActionType } from '../../patternSpec'
import { PerformerStateActionType } from '../../performer'

// tslint:disable-next-line:variable-name typedef
const ActionType = {
    ...PatternSpecStateActionType,
    ...PerformerStateActionType,
    ...PatternStateActionType,
}

export {
    ActionType,
}
