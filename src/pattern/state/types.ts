import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { PageName } from '../types'

enum PatternStateKey {
    PATTERNS = 'PATTERNS',
    ID = 'ID',
    DEBUG_MODE = 'DEBUG_MODE',
    LEFT_COLUMN_OPEN = 'LEFT_COLUMN_OPEN',
    RIGHT_COLUMN_OPEN = 'RIGHT_COLUMN_OPEN',
    PAGE_NAME = 'PAGE_NAME',
}

interface PatternState {
    [ PatternStateKey.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKey.ID ]: Maybe<Id>,
    [ PatternStateKey.DEBUG_MODE ]: boolean,
    [ PatternStateKey.LEFT_COLUMN_OPEN ]: boolean,
    [ PatternStateKey.RIGHT_COLUMN_OPEN ]: boolean,
    [ PatternStateKey.PAGE_NAME ]: Maybe<PageName>,
}

type ImmutablePatternState = TypedMap<PatternState>

enum PatternStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
    SET_LEFT_COLUMN_OPEN = 'SET_LEFT_COLUMN_OPEN',
    SET_RIGHT_COLUMN_OPEN = 'SET_RIGHT_COLUMN_OPEN',
    SET_PAGE_NAME = 'SET_PAGE_NAME',
}

type PatternStateActionMap = { [key in keyof typeof PatternStateActionType]: PatternStateKey }

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

interface SetLeftColumnOpen {
    data: boolean,
    type: PatternStateActionType.SET_LEFT_COLUMN_OPEN,
}

interface SetRightColumnOpen {
    data: boolean,
    type: PatternStateActionType.SET_RIGHT_COLUMN_OPEN,
}

interface SetPage {
    data: Maybe<PageName>,
    type: PatternStateActionType.SET_PAGE_NAME,
}

type PatternStateAction =
    SetPatterns |
    SetId |
    SetDebugMode |
    SetLeftColumnOpen |
    SetRightColumnOpen |
    SetPage

export {
    PatternStateKey,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
    PatternState,
    PatternStateActionMap,
}
