import { Preset, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'
import { InvalidSpecMessages } from '../types'

enum SpecStateKeys {
    DEFAULT_SPEC = 'DEFAULT_SPEC',
    DISPLAYED_SPEC = 'DISPLAYED_SPEC',
    INVALID_SPEC_MESSAGES = 'INVALID_SPEC_MESSAGES',
    SUBMITTED_SPEC = 'SUBMITTED_SPEC',
    SPEC_ATTRIBUTES = 'SPEC_ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
}

interface SpecState {
    [ SpecStateKeys.DEFAULT_SPEC ]: Spec,
    [ SpecStateKeys.DISPLAYED_SPEC ]: Spec,
    [ SpecStateKeys.INVALID_SPEC_MESSAGES ]: InvalidSpecMessages,
    [ SpecStateKeys.SUBMITTED_SPEC ]: Spec,
    [ SpecStateKeys.SPEC_ATTRIBUTES ]: SpecAttributes,
    [ SpecStateKeys.VALIDATION_FUNCTION ]: Maybe<SpecValidationFunction>,
    [ SpecStateKeys.PRESETS ]: Maybe<DictionaryOf<Preset>>,
}

type SpecStateValueTypes =
    InvalidSpecMessages |
    Spec |
    SpecAttributes |
    Maybe<SpecValidationFunction> |
    Maybe<DictionaryOf<Preset>>

type ImmutableSpecState = TypedMap<SpecStateValueTypes, SpecState>

enum SpecStateActionType {
    SET_DEFAULT_SPEC = 'SET_DEFAULT_SPEC',
    SET_SUBMITTED_SPEC = 'SET_SUBMITTED_SPEC',
    SET_DISPLAYED_SPEC = 'SET_DISPLAYED_SPEC',
    SET_INVALID_SPEC_MESSAGES = 'SET_INVALID_SPEC_MESSAGES',
    SET_SPEC_ATTRIBUTES = 'SET_SPEC_ATTRIBUTES',
    SET_VALIDATION_FUNCTION = 'SET_VALIDATION_FUNCTION',
    SET_PRESETS = 'SET_PRESETS',
}

interface SetDefaultSpec {
    data: Spec,
    type: SpecStateActionType.SET_DEFAULT_SPEC,
}

interface SetSubmittedSpec {
    data: Spec,
    type: SpecStateActionType.SET_SUBMITTED_SPEC,
}

interface SetDisplayedSpec {
    data: Spec,
    type: SpecStateActionType.SET_DISPLAYED_SPEC,
}

interface SetInvalidSpecMessages {
    data: InvalidSpecMessages,
    type: SpecStateActionType.SET_INVALID_SPEC_MESSAGES,
}

interface SetSpecAttributes {
    data: SpecAttributes,
    type: SpecStateActionType.SET_SPEC_ATTRIBUTES,
}

interface SetValidationFunction {
    data: Maybe<SpecValidationFunction>,
    type: SpecStateActionType.SET_VALIDATION_FUNCTION,
}

interface SetPresets {
    data: Maybe<DictionaryOf<Preset>>,
    type: SpecStateActionType.SET_PRESETS,
}

type SpecStateAction =
    SetDefaultSpec |
    SetSubmittedSpec |
    SetDisplayedSpec |
    SetInvalidSpecMessages |
    SetSpecAttributes |
    SetValidationFunction |
    SetPresets

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKeys,
    SpecStateAction,
    SpecStateActionType,
}
