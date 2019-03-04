import { TypedMap } from '@musical-patterns/utilities'
import { ImmutablePageState, PageStateAction } from '../../page'
import { ImmutablePerformerState, PerformerStateAction } from '../../performer'
import { ImmutableSpecState, SpecStateAction } from '../../spec'

type Action =
    SpecStateAction |
    PerformerStateAction |
    PageStateAction

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
