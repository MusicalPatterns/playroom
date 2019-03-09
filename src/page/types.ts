import { Id, Patterns } from '@musical-patterns/pattern'
import { ActionForState, Maybe, TypedMap } from '@musical-patterns/utilities'

enum PageName {
    ABOUT = 'About',
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
    patternId: Maybe<Id>,
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
