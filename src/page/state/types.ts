import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { PageName } from '../types'

enum PageStateKey {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
    DEBUG_MODE = 'DEBUG_MODE',
    LEFT_COLUMN_OPEN = 'LEFT_COLUMN_OPEN',
    RIGHT_COLUMN_OPEN = 'RIGHT_COLUMN_OPEN',
    PAGE_NAME = 'PAGE_NAME',
}

interface PageState {
    [ PageStateKey.PATTERNS ]: Maybe<Partial<Patterns>>,
    [ PageStateKey.PATTERN_ID ]: Maybe<Id>,
    [ PageStateKey.DEBUG_MODE ]: boolean,
    [ PageStateKey.LEFT_COLUMN_OPEN ]: boolean,
    [ PageStateKey.RIGHT_COLUMN_OPEN ]: boolean,
    [ PageStateKey.PAGE_NAME ]: Maybe<PageName>,
}

type ImmutablePageState = TypedMap<PageState>

enum PageStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
    SET_LEFT_COLUMN_OPEN = 'SET_LEFT_COLUMN_OPEN',
    SET_RIGHT_COLUMN_OPEN = 'SET_RIGHT_COLUMN_OPEN',
    SET_PAGE_NAME = 'SET_PAGE_NAME',
}

type PageStateActionMap = { [key in keyof typeof PageStateActionType]: PageStateKey }

interface SetPatterns {
    data: Partial<Patterns>,
    type: PageStateActionType.SET_PATTERNS,
}

interface SetPatternId {
    data: Maybe<Id>,
    type: PageStateActionType.SET_PATTERN_ID,
}

interface SetDebugMode {
    data: boolean,
    type: PageStateActionType.SET_DEBUG_MODE,
}

interface SetLeftColumnOpen {
    data: boolean,
    type: PageStateActionType.SET_LEFT_COLUMN_OPEN,
}

interface SetRightColumnOpen {
    data: boolean,
    type: PageStateActionType.SET_RIGHT_COLUMN_OPEN,
}

interface SetPage {
    data: Maybe<PageName>,
    type: PageStateActionType.SET_PAGE_NAME,
}

type PageStateAction =
    SetPatterns |
    SetPatternId |
    SetDebugMode |
    SetLeftColumnOpen |
    SetRightColumnOpen |
    SetPage

export {
    PageStateKey,
    ImmutablePageState,
    PageStateAction,
    PageStateActionType,
    PageState,
    PageStateActionMap,
}
