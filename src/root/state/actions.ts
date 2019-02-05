import { PatternStateActionType } from '../../pattern'
import { PerformerStateActionType } from '../../performer'
import { SpecStateActionType } from '../../spec'

// tslint:disable-next-line variable-name typedef
const ActionType = {
    ...SpecStateActionType,
    ...PerformerStateActionType,
    ...PatternStateActionType,
}

export {
    ActionType,
}
