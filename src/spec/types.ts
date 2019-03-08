// tslint:disable max-file-line-count

import {
    Attributes,
    DomSpec,
    Preset,
    Spec,
    ValidationFunction,
    ValidationResults,
    Value,
} from '@musical-patterns/pattern'
import { ActionForState, DictionaryOf, HtmlValue, Maybe, TypedMap } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../types'
import { InputsPropsFromParent } from './inputs'

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

interface AddOrRemoveButtonPropsFromParent {
    property: string,
}

interface AddOrRemoveButtonPropsFromState {
    specState: ImmutableSpecState,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromState,
    AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp,
    AddOrRemoveButtonPropsFromParent, AddOrRemoveButtonPropsFromState {}

interface RangedInputsProps extends InputsPropsFromParent {
    max: number,
    min: number,
    step: number,
    value: HtmlValue,
}

enum SpecControlStates {
    INVALID = 'invalid',
    VALID = 'valid',
}

interface SpecPanelOpenAsProp {
    specPanelOpen: boolean,
}

interface HandleArrayedSpecControlAddOrRemoveParameters extends EventAsProp,
    DispatchAsProp, AddOrRemoveButtonPropsFromParent, AddOrRemoveButtonPropsFromState {}

interface BuildAttemptSubmitActionsParameters {
    property: string,
    specState: ImmutableSpecState,
    suppressReevaluatingValidationResults?: boolean,
    updatedValue: Value,
}

interface ValidateSubmittedSpecParameters {
    attributes: Attributes,
    property: string,
    updatedDisplayedSpec: DomSpec,
    validationFunction?: ValidationFunction,
}

interface SpecValidationResult {
    isValid: boolean,
    updatedValidationResults: ValidationResults,
}

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecAction,
    AddOrRemoveButtonPropsFromState,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonPropsFromParent,
    AddOrRemoveButtonProps,
    HandleAddOrRemoveParameters,
    SpecControlStates,
    SpecPanelOpenAsProp,
    RangedInputsProps,
    HandleArrayedSpecControlAddOrRemoveParameters,
    BuildAttemptSubmitActionsParameters,
    SpecValidationResult,
    ValidateSubmittedSpecParameters,
}
