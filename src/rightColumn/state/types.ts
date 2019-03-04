// tslint:disable max-file-line-count

import { Preset, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe, TypedMap } from '@musical-patterns/utilities'
import { InvalidSpecMessages } from '../types'

enum RightColumnStateKey {
    INITIAL_SPEC = 'INITIAL_SPEC',
    DISPLAYED_SPEC = 'DISPLAYED_SPEC',
    INVALID_SPEC_MESSAGES = 'INVALID_SPEC_MESSAGES',
    SUBMITTED_SPEC = 'SUBMITTED_SPEC',
    SPEC_ATTRIBUTES = 'SPEC_ATTRIBUTES',
    VALIDATION_FUNCTION = 'VALIDATION_FUNCTION',
    PRESETS = 'PRESETS',
    SPEC_PANEL_OPEN = 'SPEC_PANEL_OPEN',
    RIGHT_COLUMN_OPEN = 'RIGHT_COLUMN_OPEN',
}

interface RightColumnState {
    [ RightColumnStateKey.INITIAL_SPEC ]: Spec,
    [ RightColumnStateKey.DISPLAYED_SPEC ]: Spec,
    [ RightColumnStateKey.INVALID_SPEC_MESSAGES ]: InvalidSpecMessages,
    [ RightColumnStateKey.SUBMITTED_SPEC ]: Spec,
    [ RightColumnStateKey.SPEC_ATTRIBUTES ]: SpecAttributes,
    [ RightColumnStateKey.VALIDATION_FUNCTION ]: Maybe<SpecValidationFunction>,
    [ RightColumnStateKey.PRESETS ]: Maybe<DictionaryOf<Preset>>,
    [ RightColumnStateKey.SPEC_PANEL_OPEN ]: boolean,
    [ RightColumnStateKey.RIGHT_COLUMN_OPEN ]: boolean,
}

type ImmutableRightColumnState = TypedMap<RightColumnState>

enum RightColumnStateActionType {
    SET_INITIAL_SPEC = 'SET_INITIAL_SPEC',
    SET_SUBMITTED_SPEC = 'SET_SUBMITTED_SPEC',
    SET_DISPLAYED_SPEC = 'SET_DISPLAYED_SPEC',
    SET_INVALID_SPEC_MESSAGES = 'SET_INVALID_SPEC_MESSAGES',
    SET_SPEC_ATTRIBUTES = 'SET_SPEC_ATTRIBUTES',
    SET_VALIDATION_FUNCTION = 'SET_VALIDATION_FUNCTION',
    SET_PRESETS = 'SET_PRESETS',
    SET_SPEC_PANEL_OPEN = 'SET_SPEC_PANEL_OPEN',
    SET_RIGHT_COLUMN_OPEN = 'SET_RIGHT_COLUMN_OPEN',
}

type RightColumnStateActionMap = { [key in keyof typeof RightColumnStateActionType]: RightColumnStateKey }

interface SetInitialSpec {
    data: Spec,
    type: RightColumnStateActionType.SET_INITIAL_SPEC,
}

interface SetSubmittedSpec {
    data: Spec,
    type: RightColumnStateActionType.SET_SUBMITTED_SPEC,
}

interface SetDisplayedSpec {
    data: Spec,
    type: RightColumnStateActionType.SET_DISPLAYED_SPEC,
}

interface SetInvalidSpecMessages {
    data: InvalidSpecMessages,
    type: RightColumnStateActionType.SET_INVALID_SPEC_MESSAGES,
}

interface SetSpecAttributes {
    data: SpecAttributes,
    type: RightColumnStateActionType.SET_SPEC_ATTRIBUTES,
}

interface SetValidationFunction {
    data: Maybe<SpecValidationFunction>,
    type: RightColumnStateActionType.SET_VALIDATION_FUNCTION,
}

interface SetPresets {
    data: Maybe<DictionaryOf<Preset>>,
    type: RightColumnStateActionType.SET_PRESETS,
}

interface SetSpecPanelOpen {
    data: boolean,
    type: RightColumnStateActionType.SET_SPEC_PANEL_OPEN,
}

interface SetRightColumnOpen {
    data: boolean,
    type: RightColumnStateActionType.SET_RIGHT_COLUMN_OPEN,
}

type RightColumnStateAction =
    SetInitialSpec |
    SetSubmittedSpec |
    SetDisplayedSpec |
    SetInvalidSpecMessages |
    SetSpecAttributes |
    SetValidationFunction |
    SetPresets |
    SetSpecPanelOpen |
    SetRightColumnOpen

export {
    RightColumnState,
    ImmutableRightColumnState,
    RightColumnStateKey,
    RightColumnStateAction,
    RightColumnStateActionType,
    RightColumnStateActionMap,
}
