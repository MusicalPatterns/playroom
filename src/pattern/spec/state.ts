import { standardConfigurations } from '@musical-patterns/pattern'
import { typedMap } from '@musical-patterns/utilities'
import { ImmutableSpecState, SpecState, SpecStateKey } from './types'

const initialSpecState: ImmutableSpecState = typedMap<SpecState>({
    [ SpecStateKey.INITIAL_SPECS ]: {},
    [ SpecStateKey.DISPLAYED_SPECS ]: {},
    [ SpecStateKey.VALIDATIONS ]: {},
    [ SpecStateKey.SUBMITTED_SPECS ]: {},
    [ SpecStateKey.CONFIGURATIONS ]: standardConfigurations,
    [ SpecStateKey.COMPUTE_VALIDATIONS ]: undefined,
    [ SpecStateKey.PRESETS ]: undefined,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: false,
})

export {
    initialSpecState,
}
