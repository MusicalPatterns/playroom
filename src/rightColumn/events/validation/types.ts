import { SpecValue } from '../../../types'
import { ImmutableRightColumnState } from '../../state'

interface BuildAttemptSubmitActionsParameters {
    rightColumnState: ImmutableRightColumnState,
    specKey: string,
    specValue: SpecValue,
    suppressInvalidMessages?: boolean,
}

export {
    BuildAttemptSubmitActionsParameters,
}
