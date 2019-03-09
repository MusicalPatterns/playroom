import { Attributes, DomSpec, Preset, Spec, ValidationFunction, ValidationResults } from '@musical-patterns/pattern'
import { ActionForState, DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'

enum SpecStateKey {
    INITIAL_SPEC = 'INITIAL_SPEC',
    DISPLAYED_SPEC = 'DISPLAYED_SPEC',
    VALIDATION_RESULTS = 'VALIDATION_RESULTS',
    SUBMITTED_SPEC = 'SUBMITTED_SPEC',
    ATTRIBUTES = 'ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
    SPEC_PANEL_OPEN = 'SPEC_PANEL_OPEN',
}

interface SpecState {
    [ SpecStateKey.INITIAL_SPEC ]: Spec,
    [ SpecStateKey.DISPLAYED_SPEC ]: DomSpec,
    [ SpecStateKey.VALIDATION_RESULTS ]: ValidationResults,
    [ SpecStateKey.SUBMITTED_SPEC ]: Spec,
    [ SpecStateKey.ATTRIBUTES ]: Attributes,
    [ SpecStateKey.VALIDATION_FUNCTION ]: Maybe<ValidationFunction>,
    [ SpecStateKey.PRESETS ]: Maybe<DictionaryOf<Preset>>,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: boolean,
}

type ImmutableSpecState = TypedMap<SpecState>

type SpecAction = ActionForState<SpecState>

enum FieldValidity {
    INVALID = 'invalid',
    VALID = 'valid',
}

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecAction,
    FieldValidity,
}
