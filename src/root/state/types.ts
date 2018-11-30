import { PatternId, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'
import { PatternIdStateAction } from '../../patternId'
import { PatternsStateAction } from '../../patterns'
import { ImmutablePatternSpecState, PatternSpecStateAction } from '../../patternSpec'
import { ImmutablePerformerState, PerformerStateAction } from '../../performer'

type Action = PatternIdStateAction |
    PatternSpecStateAction |
    PerformerStateAction |
    PatternsStateAction

enum RootStateKeys {
    PATTERN_ID = 'PATTERN_ID',
    PATTERN_SPEC = 'PATTERN_SPEC',
    PERFORMER = 'PERFORMER',
    PATTERNS = 'PATTERNS',
}

interface RootState {
    [ RootStateKeys.PATTERN_ID ]: Maybe<PatternId>,
    [ RootStateKeys.PATTERN_SPEC ]: ImmutablePatternSpecState,
    [ RootStateKeys.PERFORMER ]: ImmutablePerformerState,
    [ RootStateKeys.PATTERNS ]: Maybe<Patterns>,
}

type ImmutableRootState = TypedMap<RootStateValueTypes, RootState>

type RootStateValueTypes =
    ImmutablePatternSpecState |
    ImmutablePerformerState |
    Maybe<PatternId> |
    Maybe<Patterns>

export {
    ImmutableRootState,
    RootStateKeys,
    Action,
}
