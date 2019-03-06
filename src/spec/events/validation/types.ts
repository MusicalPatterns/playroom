import { SpecValue } from '@musical-patterns/pattern'
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
