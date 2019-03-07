// tslint:disable max-file-line-count

import {
    DomSpec,
    Preset,
    Spec,
    SpecAttributes,
    SpecValidationFunction,
    SpecValidationResults,
} from '@musical-patterns/pattern'
import { ActionForState, DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'

enum SpecStateKey {
    INITIAL_SPEC = 'INITIAL_SPEC',
    DISPLAYED_SPEC = 'DISPLAYED_SPEC',
    SPEC_VALIDATION_RESULTS = 'SPEC_VALIDATION_RESULTS',
    SUBMITTED_SPEC = 'SUBMITTED_SPEC',
    SPEC_ATTRIBUTES = 'SPEC_ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
    SPEC_PANEL_OPEN = 'SPEC_PANEL_OPEN',
}

interface SpecState {
    [ SpecStateKey.INITIAL_SPEC ]: Spec,
    [ SpecStateKey.DISPLAYED_SPEC ]: DomSpec,
    [ SpecStateKey.SPEC_VALIDATION_RESULTS ]: SpecValidationResults,
    [ SpecStateKey.SUBMITTED_SPEC ]: Spec,
    [ SpecStateKey.SPEC_ATTRIBUTES ]: SpecAttributes,
    [ SpecStateKey.VALIDATION_FUNCTION ]: Maybe<SpecValidationFunction>,
    [ SpecStateKey.PRESETS ]: Maybe<DictionaryOf<Preset>>,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: boolean,
}

type ImmutableSpecState = TypedMap<SpecState>

type SpecAction = ActionForState<SpecState>

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecAction,
}
