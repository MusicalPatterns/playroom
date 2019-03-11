import { Attributes, DomSpec, Preset, Spec, ValidationFunction, ValidationResults } from '@musical-patterns/pattern'
import { ActionForState, Maybe, ObjectOf, TypedMap } from '@musical-patterns/utilities'
import { FieldParentProps } from './field'

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
    [ SpecStateKey.PRESETS ]: Maybe<ObjectOf<Preset>>,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: boolean,
}

type ImmutableSpecState = TypedMap<SpecState>

type SpecAction = ActionForState<SpecState>

interface AttributesParameter {
    attributes: Attributes,
}

interface ComputeSingularDisplayedValueParameters extends FieldParentProps {
    displayedSpec: DomSpec,
}

interface ComputeSingularSubmittedValueParameters extends FieldParentProps {
    submittedSpec: Spec,
}

interface ComputeSingularValidationResultParameters extends FieldParentProps {
    validationResults: ValidationResults,
}

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecAction,
    AttributesParameter,
    ComputeSingularValidationResultParameters,
    ComputeSingularSubmittedValueParameters,
    ComputeSingularDisplayedValueParameters,
}
