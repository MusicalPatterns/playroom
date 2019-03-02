import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { Page } from '../types'

enum PatternStateKeys {
    PATTERNS = 'PATTERNS',
    ID = 'ID',
    DEBUG_MODE = 'DEBUG_MODE',
    SIDE_PANEL_OPEN = 'SIDE_PANEL_OPEN',
    PAGE = 'PAGE',
}

interface PatternState {
    [ PatternStateKeys.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKeys.ID ]: Maybe<Id>,
    [ PatternStateKeys.DEBUG_MODE ]: boolean,
    [ PatternStateKeys.SIDE_PANEL_OPEN ]: boolean,
    [ PatternStateKeys.PAGE ]: Maybe<Page>,
}

type ImmutablePatternState = TypedMap<PatternState>

enum PatternStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
    SET_SIDE_PANEL_OPEN = 'SET_SIDE_PANEL_OPEN',
    SET_PAGE = 'SET_PAGE',
}

interface SetPatterns {
    data: Patterns,
    type: PatternStateActionType.SET_PATTERNS,
}

interface SetId {
    data: Maybe<Id>,
    type: PatternStateActionType.SET_PATTERN_ID,
}

interface SetDebugMode {
    data: boolean,
    type: PatternStateActionType.SET_DEBUG_MODE,
}

interface SetSidePanelOpen {
    data: boolean,
    type: PatternStateActionType.SET_SIDE_PANEL_OPEN,
}

interface SetPage {
    data: Maybe<Page>,
    type: PatternStateActionType.SET_PAGE,
}

type PatternStateAction =
    SetPatterns |
    SetId |
    SetDebugMode |
    SetSidePanelOpen |
    SetPage

export {
    PatternStateKeys,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
    PatternState,
}
