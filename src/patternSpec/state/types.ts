import { PatternSpecAttributes } from '@musical-patterns/pattern'
import { TypedMap } from '@musical-patterns/utilities'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'

enum PatternSpecStateKeys {
    DEFAULT_PATTERN_SPEC = 'DEFAULT_PATTERN_SPEC',
    DISABLED_PATTERN_SPEC_BUTTONS = 'DISABLED_PATTERN_SPEC_BUTTONS',
    DISPLAYED_PATTERN_SPEC = 'DISPLAYED_PATTERN_SPEC',
    INVALID_PATTERN_SPEC_CONTROLS = 'INVALID_PATTERN_SPEC_CONTROLS',
    SUBMITTED_PATTERN_SPEC = 'SUBMITTED_PATTERN_SPEC',
    UNSUBMITTED_PATTERN_SPEC_CONTROLS = 'UNSUBMITTED_PATTERN_SPEC_CONTROLS',
    PATTERN_SPEC_ATTRIBUTES = 'PATTERN_SPEC_ATTRIBUTES',
}

interface PatternSpecState {
    [ PatternSpecStateKeys.DEFAULT_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: StringifiedPatternSpecControlStates,
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_CONTROLS ]: StringifiedPatternSpecControlStates,
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: StringifiedPatternSpec,
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS ]: StringifiedPatternSpecControlStates,
    [ PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES ]: PatternSpecAttributes,
}

type PatternSpecStateValueTypes =
    StringifiedPatternSpecControlStates |
    StringifiedPatternSpec |
    PatternSpecAttributes

type ImmutablePatternSpecState = TypedMap<PatternSpecStateValueTypes, PatternSpecState>

enum PatternSpecStateActionType {
    SET_DEFAULT_PATTERN_SPEC = 'SET_DEFAULT_PATTERN_SPEC',
    SET_DISABLED_PATTERN_SPEC_BUTTONS = 'SET_DISABLED_PATTERN_SPEC_BUTTONS',
    SET_SUBMITTED_PATTERN_SPEC = 'SET_SUBMITTED_PATTERN_SPEC',
    SET_DISPLAYED_PATTERN_SPEC = 'SET_DISPLAYED_PATTERN_SPEC',
    SET_INVALID_PATTERN_SPEC_CONTROLS = 'SET_INVALID_PATTERN_SPEC_CONTROLS',
    SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS = 'SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS',
    SET_PATTERN_SPEC_ATTRIBUTES = 'SET_PATTERN_SPEC_ATTRIBUTES',
}

interface SetDefaultPatternSpec {
    data: StringifiedPatternSpec,
    type: PatternSpecStateActionType.SET_DEFAULT_PATTERN_SPEC,
}

interface SetDisabledPatternSpecButtons {
    data: StringifiedPatternSpecControlStates,
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

interface SetInvalidPatternSpecControls {
    data: StringifiedPatternSpecControlStates,
    type: PatternSpecStateActionType.SET_INVALID_PATTERN_SPEC_CONTROLS,
}

interface SetUnsubmittedPatternSpecControls {
    data: StringifiedPatternSpecControlStates,
    type: PatternSpecStateActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS,
}

interface SetPatternSpecAttributes {
    data: PatternSpecAttributes,
    type: PatternSpecStateActionType.SET_PATTERN_SPEC_ATTRIBUTES,
}

type PatternSpecStateAction =
    SetDefaultPatternSpec |
    SetDisabledPatternSpecButtons |
    SetSubmittedPatternSpec |
    SetDisplayedPatternSpec |
    SetInvalidPatternSpecControls |
    SetUnsubmittedPatternSpecControls |
    SetPatternSpecAttributes

export {
    PatternSpecState,
    ImmutablePatternSpecState,
    PatternSpecStateKeys,
    PatternSpecStateAction,
    PatternSpecStateActionType,
}
