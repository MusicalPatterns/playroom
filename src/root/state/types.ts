import { TypedMap } from '@musical-patterns/utilities'
import { ImmutablePageState, PageAction } from '../../page'
import { ImmutablePerformerState, PerformerAction } from '../../performer'
import { ImmutableSpecState, SpecAction } from '../../spec'

type Action = SpecAction | PerformerAction | PageAction

enum RootStateKey {
    PAGE = 'PAGE',
    PERFORMER = 'PERFORMER',
    SPEC = 'SPEC',
}

interface RootState {
    [ RootStateKey.PAGE ]: ImmutablePageState,
    [ RootStateKey.PERFORMER ]: ImmutablePerformerState,
    [ RootStateKey.SPEC ]: ImmutableSpecState,
}

type ImmutableRootState = TypedMap<RootState>

export {
    ImmutableRootState,
    RootStateKey,
    Action,
}
