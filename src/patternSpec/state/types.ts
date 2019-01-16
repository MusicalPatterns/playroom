// tslint:disable:max-file-line-count

import { PatternSpecPropertyRange, PatternSpecPropertyType } from '@musical-patterns/pattern'
import { DictionaryOf, TypedMap } from '@musical-patterns/utilities'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'

enum PatternSpecStateKeys {
    DEFAULT_PATTERN_SPEC = 'DEFAULT_PATTERN_SPEC',
    DISABLED_PATTERN_SPEC_BUTTONS = 'DISABLED_PATTERN_SPEC_BUTTONS',
    DISPLAYED_PATTERN_SPEC = 'DISPLAYED_PATTERN_SPEC',
    INVALID_PATTERN_SPEC_INPUTS = 'INVALID_PATTERN_SPEC_INPUTS',
    SUBMITTED_PATTERN_SPEC = 'SUBMITTED_PATTERN_SPEC',
    UNSUBMITTED_PATTERN_SPEC_INPUTS = 'UNSUBMITTED_PATTERN_SPEC_INPUTS',
    PATTERN_SPEC_PROPERTY_TYPES = 'PATTERN_SPEC_PROPERTY_TYPES',
    PATTERN_SPEC_PROPERTY_RANGES = 'PATTERN_SPEC_PROPERTY_RANGES',
}

interface PatternSpecState {
    [ PatternSpecStateKeys.DEFAULT_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: StringifiedPatternSpecInputStates,
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS ]: StringifiedPatternSpecInputStates,
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS ]: StringifiedPatternSpecInputStates,
    [ PatternSpecStateKeys.PATTERN_SPEC_PROPERTY_TYPES ]: DictionaryOf<PatternSpecPropertyType>,
    [ PatternSpecStateKeys.PATTERN_SPEC_PROPERTY_RANGES ]: DictionaryOf<PatternSpecPropertyRange>,
}

type PatternSpecStateValueTypes =
    StringifiedPatternSpecInputStates |
    StringifiedPatternSpec |
    DictionaryOf<PatternSpecPropertyType> |
    DictionaryOf<PatternSpecPropertyRange>

type ImmutablePatternSpecState = TypedMap<PatternSpecStateValueTypes, PatternSpecState>

enum PatternSpecStateActionType {
    SET_DEFAULT_PATTERN_SPEC = 'SET_DEFAULT_PATTERN_SPEC',
    SET_DISABLED_PATTERN_SPEC_BUTTONS = 'SET_DISABLED_PATTERN_SPEC_BUTTONS',
    SET_SUBMITTED_PATTERN_SPEC = 'SET_SUBMITTED_PATTERN_SPEC',
    SET_DISPLAYED_PATTERN_SPEC = 'SET_DISPLAYED_PATTERN_SPEC',
    SET_INVALID_PATTERN_SPEC_INPUTS = 'SET_INVALID_PATTERN_SPEC_INPUTS',
    SET_UNSUBMITTED_PATTERN_SPEC_INPUTS = 'SET_UNSUBMITTED_PATTERN_SPEC_INPUTS',
    SET_PATTERN_SPEC_PROPERTY_TYPES = 'SET_PATTERN_SPEC_PROPERTY_TYPES',
    SET_PATTERN_SPEC_PROPERTY_RANGES = 'SET_PATTERN_SPEC_PROPERTY_RANGES',
}

interface SetDefaultPatternSpec {
    data: StringifiedPatternSpec,
    type: PatternSpecStateActionType.SET_DEFAULT_PATTERN_SPEC,
}

interface SetDisabledPatternSpecButtons {
    data: StringifiedPatternSpecInputStates,
    type: PatternSpecStateActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS,
}

interface SetSubmittedPatternSpec {
    data: StringifiedPatternSpec,
    type: PatternSpecStateActionType.SET_SUBMITTED_PATTERN_SPEC,
}

interface SetDisplayedPatternSpec {
    data: StringifiedPatternSpec,
    type: PatternSpecStateActionType.SET_DISPLAYED_PATTERN_SPEC,
}

interface SetInvalidPatternSpecInputs {
    data: StringifiedPatternSpecInputStates,
    type: PatternSpecStateActionType.SET_INVALID_PATTERN_SPEC_INPUTS,
}

interface SetUnsubmittedPatternSpecInputs {
    data: StringifiedPatternSpecInputStates,
    type: PatternSpecStateActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS,
}

interface SetPatternSpecPropertyTypes {
    data: DictionaryOf<PatternSpecPropertyType>,
    type: PatternSpecStateActionType.SET_PATTERN_SPEC_PROPERTY_TYPES,
}

interface SetPatternSpecPropertyRanges {
    data: DictionaryOf<PatternSpecPropertyRange>,
    type: PatternSpecStateActionType.SET_PATTERN_SPEC_PROPERTY_RANGES,
}

type PatternSpecStateAction =
    SetDefaultPatternSpec |
    SetDisabledPatternSpecButtons |
    SetSubmittedPatternSpec |
    SetDisplayedPatternSpec |
    SetInvalidPatternSpecInputs |
    SetUnsubmittedPatternSpecInputs |
    SetPatternSpecPropertyTypes |
    SetPatternSpecPropertyRanges

export {
    PatternSpecState,
    ImmutablePatternSpecState,
    PatternSpecStateKeys,
    PatternSpecStateAction,
    PatternSpecStateActionType,
}
