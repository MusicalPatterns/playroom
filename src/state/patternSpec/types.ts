import { DictionaryOf, TypedMap } from '@musical-patterns/utilities'

type StringifiedPatternSpec = DictionaryOf<string>

type StringifiedPatternSpecInputStates = DictionaryOf<boolean>

type StringifiedPatternSpecEntry = [ string, string ]

enum PatternSpecStateKeys {
    DISABLED_PATTERN_SPEC_BUTTONS = 'DISABLED_PATTERN_SPEC_BUTTONS',
    DISPLAYED_PATTERN_SPEC = 'DISPLAYED_PATTERN_SPEC',
    INVALID_PATTERN_SPEC_INPUTS = 'INVALID_PATTERN_SPEC_INPUTS',
    SUBMITTED_PATTERN_SPEC = 'SUBMITTED_PATTERN_SPEC',
    UNSUBMITTED_PATTERN_SPEC_INPUTS = 'UNSUBMITTED_PATTERN_SPEC_INPUTS',
}

interface PatternSpecState {
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: StringifiedPatternSpecInputStates,
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS ]: StringifiedPatternSpecInputStates,
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS ]: StringifiedPatternSpecInputStates,
}

type PatternSpecStateValueTypes =
    StringifiedPatternSpecInputStates |
    StringifiedPatternSpec

type ImmutablePatternSpecState = TypedMap<PatternSpecStateValueTypes, PatternSpecState>

enum PatternSpecStateActionType {
    SET_DISABLED_PATTERN_SPEC_BUTTONS = 'SET_DISABLED_PATTERN_SPEC_BUTTONS',
    SET_SUBMITTED_PATTERN_SPEC = 'SET_SUBMITTED_PATTERN_SPEC',
    SET_DISPLAYED_PATTERN_SPEC = 'SET_DISPLAYED_PATTERN_SPEC',
    SET_INVALID_PATTERN_SPEC_INPUTS = 'SET_INVALID_PATTERN_SPEC_INPUTS',
    SET_UNSUBMITTED_PATTERN_SPEC_INPUTS = 'SET_UNSUBMITTED_PATTERN_SPEC_INPUTS',
}

interface SetDisabledSongSpecButtons {
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

type PatternSpecStateAction =
    SetDisabledSongSpecButtons |
    SetSubmittedPatternSpec |
    SetDisplayedPatternSpec |
    SetInvalidPatternSpecInputs |
    SetUnsubmittedPatternSpecInputs

export {
    StringifiedPatternSpecInputStates,
    StringifiedPatternSpec,
    StringifiedPatternSpecEntry,
    PatternSpecState,
    ImmutablePatternSpecState,
    PatternSpecStateKeys,
    PatternSpecStateAction,
    PatternSpecStateActionType,
}
