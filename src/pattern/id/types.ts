import { Id } from '@musical-patterns/pattern'
import { ActionForState, Maybe, TypedMap } from '@musical-patterns/utilities'

enum IdStateKey {
    PATTERN_ID = 'PATTERN_ID',
}

interface IdState {
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
