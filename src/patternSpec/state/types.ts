// tslint:disable:max-file-line-count

import { PatternSpec, PatternSpecAttributes, PatternSpecValidationFunction } from '@musical-patterns/pattern'
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
    [ PatternSpecStateKeys.DEFAULT_PATTERN_SPEC ]: PatternSpec,
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: PatternSpecControlBooleanStates,
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: PatternSpec,
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES ]: InvalidPatternSpecMessages,
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: PatternSpec,
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS ]: PatternSpecControlBooleanStates,
    [ PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES ]: PatternSpecAttributes,
    [ PatternSpecStateKeys.VALIDATION_FUNCTION ]: Maybe<PatternSpecValidationFunction>,
    [ PatternSpecStateKeys.PRESETS ]: Maybe<DictionaryOf<PatternSpec>>,
}

type PatternSpecStateValueTypes =
    PatternSpecControlBooleanStates |
    InvalidPatternSpecMessages |
    PatternSpec |
    PatternSpecAttributes |
    Maybe<PatternSpecValidationFunction> |
    Maybe<DictionaryOf<PatternSpec>>

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
    data: PatternSpec,
    type: PatternSpecStateActionType.SET_DEFAULT_PATTERN_SPEC,
}

interface SetDisabledPatternSpecButtons {
    data: PatternSpecControlBooleanStates,
    type: PatternSpecStateActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS,
}

interface SetSubmittedPatternSpec {
    data: PatternSpec,
    type: PatternSpecStateActionType.SET_SUBMITTED_PATTERN_SPEC,
}

interface SetDisplayedPatternSpec {
    data: PatternSpec,
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
    data: PatternSpecAttributes,
    type: PatternSpecStateActionType.SET_PATTERN_SPEC_ATTRIBUTES,
}

interface SetValidationFunction {
    data: Maybe<PatternSpecValidationFunction>,
    type: PatternSpecStateActionType.SET_VALIDATION_FUNCTION,
}

interface SetPresets {
    data: Maybe<DictionaryOf<PatternSpec>>,
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
