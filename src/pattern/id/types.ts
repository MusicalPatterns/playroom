import { Id } from '@musical-patterns/id'
import { Patterns } from '@musical-patterns/pattern'
import { ActionForState, Maybe, TypedMap } from '@musical-patterns/utilities'

enum IdStateKey {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
}

interface IdState {
    [ IdStateKey.PATTERNS ]: Maybe<Partial<Patterns>>,
    [ IdStateKey.PATTERN_ID ]: Maybe<Id>,
}

type ImmutableIdState = TypedMap<IdState>

type IdAction = ActionForState<IdState>

export {
    IdState,
    ImmutableIdState,
    IdStateKey,
    IdAction,
}
