import { SpecValue } from '../../../types'
import { ImmutableSpecState } from '../../state'

interface BuildAttemptSubmitActionsParameters {
    specKey: string,
    specState: ImmutableSpecState,
    specValue: SpecValue,
    suppressSpecValidationResults?: boolean,
}

export {
    BuildAttemptSubmitActionsParameters,
}
