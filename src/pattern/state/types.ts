import { PatternId, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'

enum PatternStateKeys {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
}

interface PatternState {
    [ PatternStateKeys.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKeys.PATTERN_ID ]: Maybe<PatternId>,
}

type PatternStateValueTypes =
    Maybe<Patterns> |
    Maybe<PatternId>

type ImmutablePatternState = TypedMap<PatternStateValueTypes, PatternState>

enum PatternStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
}

interface SetPatterns {
    data: Patterns,
    type: PatternStateActionType.SET_PATTERNS,
}

interface SetPatternId {
    data: PatternId,
    type: PatternStateActionType.SET_PATTERN_ID,
}

type PatternStateAction =
    SetPatterns |
    SetPatternId

export {
    PatternStateKeys,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
}
