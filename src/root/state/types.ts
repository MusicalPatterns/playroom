import { PatternId, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternStateAction } from '../../pattern'
import { ImmutablePatternSpecState, PatternSpecStateAction } from '../../patternSpec'
import { ImmutablePerformerState, PerformerStateAction } from '../../performer'

type Action =
    PatternSpecStateAction |
    PerformerStateAction |
    PatternStateAction

enum RootStateKeys {
    PATTERN_SPEC = 'PATTERN_SPEC',
    PERFORMER = 'PERFORMER',
    PATTERN = 'PATTERN',
}

interface RootState {
    [ RootStateKeys.PATTERN_SPEC ]: ImmutablePatternSpecState,
    [ RootStateKeys.PERFORMER ]: ImmutablePerformerState,
    [ RootStateKeys.PATTERN ]: ImmutablePatternState,
}

type ImmutableRootState = TypedMap<RootStateValueTypes, RootState>

type RootStateValueTypes =
    ImmutablePatternSpecState |
    ImmutablePerformerState |
    ImmutablePatternState

export {
    ImmutableRootState,
    RootStateKeys,
    Action,
}
