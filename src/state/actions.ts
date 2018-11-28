import { PatternIdStateActionType } from './patternId'
import { PatternsStateActionType } from './patterns'
import { PatternSpecStateActionType } from './patternSpec'
import { PerformerStateActionType } from './performer'

// tslint:disable-next-line:variable-name typedef
const ActionType = {
    ...PatternIdStateActionType,
    ...PatternSpecStateActionType,
    ...PerformerStateActionType,
    ...PatternsStateActionType,
}

export {
    ActionType,
}
