import { Id, Patterns } from '@musical-patterns/pattern'
import { ActionForState, Maybe, TypedMap } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'

enum PageName {
    ABOUT = 'ABOUT',
}

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

type PageAction = ActionForState<PageState>

interface GetPatternParameters {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>
}

export {
    PageName,
    ImmutablePageState,
    PageStateKey,
    PageAction,
    PageState,
    GetPatternParameters,
}
