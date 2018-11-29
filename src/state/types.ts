import { PatternId } from '@musical-patterns/registry'
import { Maybe, Patterns, TypedMap } from '@musical-patterns/utilities'
import { PatternIdStateAction } from './patternId'
import { ImmutablePatternSpecState, PatternSpecStateAction } from './patternSpec'
import { ImmutablePerformerState } from './performer'

type Action = PatternIdStateAction |
    PatternSpecStateAction

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
