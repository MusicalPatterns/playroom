import { PageStateActionType } from '../../page'
import { PerformerStateActionType } from '../../performer'
import { SpecStateActionType } from '../../spec'

// tslint:disable-next-line variable-name typedef
const ActionType = {
    ...SpecStateActionType,
    ...PerformerStateActionType,
    ...PageStateActionType,
}

export {
    ActionType,
}
