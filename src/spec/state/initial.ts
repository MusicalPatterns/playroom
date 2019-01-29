import { standardSpecAttributes } from '@musical-patterns/pattern'
import { typedMap } from '@musical-patterns/utilities'
import { ImmutableSpecState, SpecStateKeys } from './types'

const initialSpecState: ImmutableSpecState = typedMap({
    [ SpecStateKeys.INITIAL_SPEC ]: {},
    [ SpecStateKeys.DISPLAYED_SPEC ]: {},
    [ SpecStateKeys.INVALID_SPEC_MESSAGES ]: {},
    [ SpecStateKeys.SUBMITTED_SPEC ]: {},
    [ SpecStateKeys.SPEC_ATTRIBUTES ]: standardSpecAttributes,
    [ SpecStateKeys.VALIDATION_FUNCTION ]: undefined,
    [ SpecStateKeys.PRESETS ]: undefined,
})

export {
    initialSpecState,
}
