import { LeftColumnStateActionType } from '../../leftColumn'
import { MiddleColumnStateActionType } from '../../middleColumn'
import { RightColumnStateActionType } from '../../rightColumn'

// tslint:disable-next-line variable-name typedef
const ActionType = {
    ...RightColumnStateActionType,
    ...MiddleColumnStateActionType,
    ...LeftColumnStateActionType,
}

export {
    ActionType,
}
