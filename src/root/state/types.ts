import { TypedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternStateAction } from '../../pattern'
import { ImmutablePerformerState, PerformerStateAction } from '../../performer'
import { ImmutableSpecState, SpecStateAction } from '../../spec'

type Action =
    SpecStateAction |
    PerformerStateAction |
    PatternStateAction

enum RootStateKeys {
    SPEC = 'SPEC',
    PERFORMER = 'PERFORMER',
    PATTERN = 'PATTERN',
}

interface RootState {
    [ RootStateKeys.SPEC ]: ImmutableSpecState,
    [ RootStateKeys.PERFORMER ]: ImmutablePerformerState,
    [ RootStateKeys.PATTERN ]: ImmutablePatternState,
}

type ImmutableRootState = TypedMap<RootStateValueTypes, RootState>

type RootStateValueTypes =
    ImmutableSpecState |
    ImmutablePerformerState |
    ImmutablePatternState

export {
    ImmutableRootState,
    RootStateKeys,
    Action,
}
