import {
    ComputeValidations,
    Configurations,
    DomSpecs,
    DomSpecValue,
    Preset,
    Specs,
    Validations,
} from '@musical-patterns/spec'
import { ActionForState, Maybe, ObjectOf, TypedMap } from '@musical-patterns/utilities'
import { ControlParentProps } from './control'
import { FieldParentProps } from './field'

enum SpecStateKey {
    INITIAL_SPECS = 'INITIAL_SPECS',
    DISPLAYED_SPECS = 'DISPLAYED_SPECS',
    VALIDATIONS = 'VALIDATIONS',
    SUBMITTED_SPECS = 'SUBMITTED_SPECS',
    CONFIGURATIONS = 'CONFIGURATIONS',
    COMPUTE_VALIDATIONS = 'COMPUTE_VALIDATIONS',
    PRESETS = 'PRESETS',
    RESTART_ON_MODIFY = 'RESTART_ON_MODIFY',
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
    [ SpecStateKey.RESTART_ON_MODIFY ]: boolean,
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

interface SubmissionProps extends ConfigurationsParameter {
    computeValidations: Maybe<ComputeValidations>,
    displayedSpecs: DomSpecs,
    restartOnModify: boolean,
    submittedSpecs: Specs,
}

interface ComputeAttemptSubmitActionsParameters extends SubmissionProps, ControlParentProps {
    suppressUpdatingValidations?: boolean,
    updatedValue: DomSpecValue,
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
    SubmissionProps,
    ComputeAttemptSubmitActionsParameters,
}
