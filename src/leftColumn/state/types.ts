import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { PageName } from '../types'

enum LeftColumnStateKey {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
    DEBUG_MODE = 'DEBUG_MODE',
    LEFT_COLUMN_OPEN = 'LEFT_COLUMN_OPEN',
    PAGE_NAME = 'PAGE_NAME',
}

interface LeftColumnState {
    [ LeftColumnStateKey.PATTERNS ]: Maybe<Patterns>,
    [ LeftColumnStateKey.PATTERN_ID ]: Maybe<Id>,
    [ LeftColumnStateKey.DEBUG_MODE ]: boolean,
    [ LeftColumnStateKey.LEFT_COLUMN_OPEN ]: boolean,
    [ LeftColumnStateKey.PAGE_NAME ]: Maybe<PageName>,
}

type ImmutableLeftColumnState = TypedMap<LeftColumnState>

enum LeftColumnStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
    SET_LEFT_COLUMN_OPEN = 'SET_LEFT_COLUMN_OPEN',
    SET_PAGE_NAME = 'SET_PAGE_NAME',
}

type LeftColumnStateActionMap = { [key in keyof typeof LeftColumnStateActionType]: LeftColumnStateKey }

interface SetPatterns {
    data: Patterns,
    type: LeftColumnStateActionType.SET_PATTERNS,
}

interface SetId {
    data: Maybe<Id>,
    type: LeftColumnStateActionType.SET_PATTERN_ID,
}

interface SetDebugMode {
    data: boolean,
    type: LeftColumnStateActionType.SET_DEBUG_MODE,
}

interface SetLeftColumnOpen {
    data: boolean,
    type: LeftColumnStateActionType.SET_LEFT_COLUMN_OPEN,
}

interface SetPage {
    data: Maybe<PageName>,
    type: LeftColumnStateActionType.SET_PAGE_NAME,
}

type LeftColumnStateAction =
    SetPatterns |
    SetId |
    SetDebugMode |
    SetLeftColumnOpen |
    SetPage

export {
    LeftColumnStateKey,
    ImmutableLeftColumnState,
    LeftColumnStateAction,
    LeftColumnStateActionType,
    LeftColumnState,
    LeftColumnStateActionMap,
}
