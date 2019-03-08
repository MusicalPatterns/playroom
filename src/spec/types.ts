// tslint:disable max-file-line-count

import {
    DomSpec,
    Preset,
    Spec,
    SpecAttributes,
    SpecValidationFunction,
    SpecValidationResults,
    SpecValue,
} from '@musical-patterns/pattern'
import { ActionForState, DictionaryOf, DomValue, Maybe, TypedMap } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../types'
import { InputProps } from './input'

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

interface AddOrRemoveButtonPropsFromParent {
    specKey: string,
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

interface RangedInputProps extends InputProps {
    max: number,
    min: number,
    step: number,
    value: DomValue,
}

enum SpecControlStates {
    INVALID = 'invalid',
    VALID = 'valid',
}

interface SpecPanelOpenAsProp {
    specPanelOpen: boolean,
}

interface HandleArrayedPropertyAddOrRemoveParameters extends EventAsProp,
    DispatchAsProp, AddOrRemoveButtonPropsFromParent, AddOrRemoveButtonPropsFromState {}

interface BuildAttemptSubmitActionsParameters {
    specKey: string,
    specState: ImmutableSpecState,
    specValue: SpecValue,
    suppressSpecValidationResults?: boolean,
}

interface ValidateSubmittedSpecParameters {
    specAttributes: SpecAttributes,
    specKey: string,
    updatedDisplayedSpec: DomSpec,
    validationFunction?: SpecValidationFunction,
}

interface SpecValidationResult {
    isValid: boolean,
    updatedSpecValidationResults: SpecValidationResults,
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
    RangedInputProps,
    HandleArrayedPropertyAddOrRemoveParameters,
    BuildAttemptSubmitActionsParameters,
    SpecValidationResult,
    ValidateSubmittedSpecParameters,
}
