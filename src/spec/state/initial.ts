import { typedMap } from '@musical-patterns/utilities'
import { ImmutableSpecState, SpecStateKeys } from './types'

const initialSpecState: ImmutableSpecState = typedMap({
    [ SpecStateKeys.DEFAULT_SPEC ]: {},
    [ SpecStateKeys.DISABLED_SPEC_BUTTONS ]: {},
    [ SpecStateKeys.DISPLAYED_SPEC ]: {},
    [ SpecStateKeys.INVALID_SPEC_MESSAGES ]: {},
    [ SpecStateKeys.SUBMITTED_SPEC ]: {},
    [ SpecStateKeys.UNSUBMITTED_SPEC_CONTROLS ]: {},
    [ SpecStateKeys.SPEC_ATTRIBUTES ]: {},
    [ SpecStateKeys.VALIDATION_FUNCTION ]: undefined,
    [ SpecStateKeys.PRESETS ]: undefined,
})

export {
    initialSpecState,
}