// tslint:disable:max-file-line-count

import { AnyPatternSpec, AnyPatternSpecAttributes, AnyPatternSpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'
import { InvalidPatternSpecMessages, PatternSpecControlBooleanStates } from '../types'

enum PatternSpecStateKeys {
    DEFAULT_PATTERN_SPEC = 'DEFAULT_PATTERN_SPEC',
    DISABLED_PATTERN_SPEC_BUTTONS = 'DISABLED_PATTERN_SPEC_BUTTONS',
    DISPLAYED_PATTERN_SPEC = 'DISPLAYED_PATTERN_SPEC',
    INVALID_PATTERN_SPEC_MESSAGES = 'INVALID_PATTERN_SPEC_MESSAGES',
    SUBMITTED_PATTERN_SPEC = 'SUBMITTED_PATTERN_SPEC',
    UNSUBMITTED_PATTERN_SPEC_CONTROLS = 'UNSUBMITTED_PATTERN_SPEC_CONTROLS',
    PATTERN_SPEC_ATTRIBUTES = 'PATTERN_SPEC_ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
}

interface PatternSpecState {
    [ PatternSpecStateKeys.DEFAULT_PATTERN_SPEC ]: AnyPatternSpec,
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: PatternSpecControlBooleanStates,
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: AnyPatternSpec,
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES ]: InvalidPatternSpecMessages,
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: AnyPatternSpec,
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS ]: PatternSpecControlBooleanStates,
    [ PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES ]: AnyPatternSpecAttributes,
    [ PatternSpecStateKeys.VALIDATION_FUNCTION ]: Maybe<AnyPatternSpecValidationFunction>,
    [ PatternSpecStateKeys.PRESETS ]: Maybe<DictionaryOf<AnyPatternSpec>>,
}

type PatternSpecStateValueTypes =
    PatternSpecControlBooleanStates |
    InvalidPatternSpecMessages |
    AnyPatternSpec |
    AnyPatternSpecAttributes |
    Maybe<AnyPatternSpecValidationFunction> |
    Maybe<DictionaryOf<AnyPatternSpec>>

type ImmutablePatternSpecState = TypedMap<PatternSpecStateValueTypes, PatternSpecState>

enum PatternSpecStateActionType {
    SET_DEFAULT_PATTERN_SPEC = 'SET_DEFAULT_PATTERN_SPEC',
    SET_DISABLED_PATTERN_SPEC_BUTTONS = 'SET_DISABLED_PATTERN_SPEC_BUTTONS',
    SET_SUBMITTED_PATTERN_SPEC = 'SET_SUBMITTED_PATTERN_SPEC',
    SET_DISPLAYED_PATTERN_SPEC = 'SET_DISPLAYED_PATTERN_SPEC',
    SET_INVALID_PATTERN_SPEC_MESSAGES = 'SET_INVALID_PATTERN_SPEC_MESSAGES',
    SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS = 'SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS',
    SET_PATTERN_SPEC_ATTRIBUTES = 'SET_PATTERN_SPEC_ATTRIBUTES',
    SET_VALIDATION_FUNCTION = 'SET_VALIDATION_FUNCTION',
    SET_PRESETS = 'SET_PRESETS',
}

interface SetDefaultPatternSpec {
    data: AnyPatternSpec,
    type: PatternSpecStateActionType.SET_DEFAULT_PATTERN_SPEC,
}

interface SetDisabledPatternSpecButtons {
    data: PatternSpecControlBooleanStates,
    type: PatternSpecStateActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS,
}

interface SetSubmittedPatternSpec {
    data: AnyPatternSpec,
    type: PatternSpecStateActionType.SET_SUBMITTED_PATTERN_SPEC,
}

interface SetDisplayedPatternSpec {
    data: AnyPatternSpec,
    type: PatternSpecStateActionType.SET_DISPLAYED_PATTERN_SPEC,
}

interface SetInvalidPatternSpecMessages {
    data: InvalidPatternSpecMessages,
    type: PatternSpecStateActionType.SET_INVALID_PATTERN_SPEC_MESSAGES,
}

interface SetUnsubmittedPatternSpecControls {
    data: PatternSpecControlBooleanStates,
    type: PatternSpecStateActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS,
}

interface SetPatternSpecAttributes {
    data: AnyPatternSpecAttributes,
    type: PatternSpecStateActionType.SET_PATTERN_SPEC_ATTRIBUTES,
}

interface SetValidationFunction {
    data: Maybe<AnyPatternSpecValidationFunction>,
    type: PatternSpecStateActionType.SET_VALIDATION_FUNCTION,
}

interface SetPresets {
    data: Maybe<DictionaryOf<AnyPatternSpec>>,
    type: PatternSpecStateActionType.SET_PRESETS,
}

type PatternSpecStateAction =
    SetDefaultPatternSpec |
    SetDisabledPatternSpecButtons |
    SetSubmittedPatternSpec |
    SetDisplayedPatternSpec |
    SetInvalidPatternSpecMessages |
    SetUnsubmittedPatternSpecControls |
    SetPatternSpecAttributes |
    SetValidationFunction |
    SetPresets

export {
    PatternSpecState,
    ImmutablePatternSpecState,
    PatternSpecStateKeys,
    PatternSpecStateAction,
    PatternSpecStateActionType,
}
