import { TypedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternStateAction } from '../../pattern'
import { ImmutablePerformerState, PerformerStateAction } from '../../performer'
import { ImmutableSpecState, SpecStateAction } from '../../spec'

type Action =
    SpecStateAction |
    PerformerStateAction |
    PatternStateAction

enum RootStateKey {
    SPEC = 'SPEC',
    PERFORMER = 'PERFORMER',
    PATTERN = 'PATTERN',
}

interface RootState {
    [ RootStateKey.SPEC ]: ImmutableSpecState,
    [ RootStateKey.PERFORMER ]: ImmutablePerformerState,
    [ RootStateKey.PATTERN ]: ImmutablePatternState,
}

type ImmutableRootState = TypedMap<RootState>

export {
    ImmutableRootState,
    RootStateKey,
    Action,
}
