import { ComputeValidations, Configurations, DomSpecs, Preset, Specs, Validations } from '@musical-patterns/pattern'
import { ActionForState, Maybe, ObjectOf, TypedMap } from '@musical-patterns/utilities'
import { FieldParentProps } from './field'

enum SpecStateKey {
    INITIAL_SPECS = 'INITIAL_SPECS',
    DISPLAYED_SPECS = 'DISPLAYED_SPECS',
    VALIDATIONS = 'VALIDATIONS',
    SUBMITTED_SPECS = 'SUBMITTED_SPECS',
    CONFIGURATIONS = 'CONFIGURATIONS',
    COMPUTE_VALIDATIONS = 'COMPUTE_VALIDATIONS',
    PRESETS = 'PRESETS',
    SPEC_PANEL_OPEN = 'SPEC_PANEL_OPEN',
}

interface SpecState {
    [ SpecStateKey.INITIAL_SPECS ]: Specs,
    [ SpecStateKey.DISPLAYED_SPECS ]: DomSpecs,
    [ SpecStateKey.VALIDATIONS ]: Validations,
    [ SpecStateKey.SUBMITTED_SPECS ]: Specs,
    [ SpecStateKey.CONFIGURATIONS ]: Configurations,
    [ SpecStateKey.COMPUTE_VALIDATIONS ]: Maybe<ComputeValidations>,
    [ SpecStateKey.PRESETS ]: Maybe<ObjectOf<Preset>>,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: boolean,
}

type ImmutableSpecState = TypedMap<SpecState>

type SpecAction = ActionForState<SpecState>

interface ConfigurationsParameter {
    configurations: Configurations,
}

interface ComputeSingularDisplayedValueParameters extends FieldParentProps {
    displayedSpecs: DomSpecs,
}

interface ComputeSingularSubmittedValueParameters extends FieldParentProps {
    submittedSpecs: Specs,
}

interface ComputeSingularValidationParameters extends FieldParentProps {
    validations: Validations,
}

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecAction,
    ConfigurationsParameter,
    ComputeSingularValidationParameters,
    ComputeSingularSubmittedValueParameters,
    ComputeSingularDisplayedValueParameters,
}
