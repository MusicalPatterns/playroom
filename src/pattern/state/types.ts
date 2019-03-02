import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { PageName } from '../types'

enum PatternStateKeys {
    PATTERNS = 'PATTERNS',
    ID = 'ID',
    DEBUG_MODE = 'DEBUG_MODE',
    SIDE_PANEL_OPEN = 'SIDE_PANEL_OPEN',
    RIGHT_PANEL_OPEN = 'RIGHT_PANEL_OPEN',
    PAGE_NAME = 'PAGE_NAME',
}

interface PatternState {
    [ PatternStateKeys.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKeys.ID ]: Maybe<Id>,
    [ PatternStateKeys.DEBUG_MODE ]: boolean,
    [ PatternStateKeys.SIDE_PANEL_OPEN ]: boolean,
    [ PatternStateKeys.RIGHT_PANEL_OPEN ]: boolean,
    [ PatternStateKeys.PAGE_NAME ]: Maybe<PageName>,
}

type ImmutablePatternState = TypedMap<PatternState>

enum PatternStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
    SET_SIDE_PANEL_OPEN = 'SET_SIDE_PANEL_OPEN',
    SET_RIGHT_PANEL_OPEN = 'SET_RIGHT_PANEL_OPEN',
    SET_PAGE_NAME = 'SET_PAGE_NAME',
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

interface SetRightPanelOpen {
    data: boolean,
    type: PatternStateActionType.SET_RIGHT_PANEL_OPEN,
}

interface SetPage {
    data: Maybe<PageName>,
    type: PatternStateActionType.SET_PAGE_NAME,
}

type PatternStateAction =
    SetPatterns |
    SetId |
    SetDebugMode |
    SetSidePanelOpen |
    SetRightPanelOpen |
    SetPage

export {
    PatternStateKeys,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
    PatternState,
}
