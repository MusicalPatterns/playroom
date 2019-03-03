import { Preset, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'
import { InvalidSpecMessages } from '../types'

enum SpecStateKey {
    INITIAL_SPEC = 'INITIAL_SPEC',
    DISPLAYED_SPEC = 'DISPLAYED_SPEC',
    INVALID_SPEC_MESSAGES = 'INVALID_SPEC_MESSAGES',
    SUBMITTED_SPEC = 'SUBMITTED_SPEC',
    SPEC_ATTRIBUTES = 'SPEC_ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
    SPEC_PANEL_OPEN = 'SPEC_PANEL_OPEN',
}

interface SpecState {
    [ SpecStateKey.INITIAL_SPEC ]: Spec,
    [ SpecStateKey.DISPLAYED_SPEC ]: Spec,
    [ SpecStateKey.INVALID_SPEC_MESSAGES ]: InvalidSpecMessages,
    [ SpecStateKey.SUBMITTED_SPEC ]: Spec,
    [ SpecStateKey.SPEC_ATTRIBUTES ]: SpecAttributes,
    [ SpecStateKey.VALIDATION_FUNCTION ]: Maybe<SpecValidationFunction>,
    [ SpecStateKey.PRESETS ]: Maybe<DictionaryOf<Preset>>,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: boolean,
}

type ImmutableSpecState = TypedMap<SpecState>

enum SpecStateActionType {
    SET_INITIAL_SPEC = 'SET_INITIAL_SPEC',
    SET_SUBMITTED_SPEC = 'SET_SUBMITTED_SPEC',
    SET_DISPLAYED_SPEC = 'SET_DISPLAYED_SPEC',
    SET_INVALID_SPEC_MESSAGES = 'SET_INVALID_SPEC_MESSAGES',
    SET_SPEC_ATTRIBUTES = 'SET_SPEC_ATTRIBUTES',
    SET_VALIDATION_FUNCTION = 'SET_VALIDATION_FUNCTION',
    SET_PRESETS = 'SET_PRESETS',
    SET_SPEC_PANEL_OPEN = 'SET_SPEC_PANEL_OPEN',
}

type SpecStateActionMap = { [key in keyof typeof SpecStateActionType]: SpecStateKey }

interface SetInitialSpec {
    data: Spec,
    type: SpecStateActionType.SET_INITIAL_SPEC,
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

interface SetSpecPanelOpen {
    data: boolean,
    type: SpecStateActionType.SET_SPEC_PANEL_OPEN,
}

type SpecStateAction =
    SetInitialSpec |
    SetSubmittedSpec |
    SetDisplayedSpec |
    SetInvalidSpecMessages |
    SetSpecAttributes |
    SetValidationFunction |
    SetPresets |
    SetSpecPanelOpen

export {
    SpecState,
    ImmutableSpecState,
    SpecStateKey,
    SpecStateAction,
    SpecStateActionType,
    SpecStateActionMap,
}
