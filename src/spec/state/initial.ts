import { standardSpecAttributes } from '@musical-patterns/pattern'
import { typedMap } from '@musical-patterns/utilities'
import { ImmutableSpecState, SpecState, SpecStateKey } from './types'

const initialSpecState: ImmutableSpecState = typedMap<SpecState>({
    [ SpecStateKey.INITIAL_SPEC ]: {},
    [ SpecStateKey.DISPLAYED_SPEC ]: {},
    [ SpecStateKey.INVALID_SPEC_MESSAGES ]: {},
    [ SpecStateKey.SUBMITTED_SPEC ]: {},
    [ SpecStateKey.SPEC_ATTRIBUTES ]: standardSpecAttributes,
    [ SpecStateKey.VALIDATION_FUNCTION ]: undefined,
    [ SpecStateKey.PRESETS ]: undefined,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: false,
})

export {
    initialSpecState,
}
