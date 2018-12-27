import { PatternId, Patterns } from '@musical-patterns/pattern'
import { Maybe, TypedMap } from '@musical-patterns/utilities'

enum PatternStateKeys {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
    DEBUG_MODE = 'DEBUG_MODE',
}

interface PatternState {
    [ PatternStateKeys.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKeys.PATTERN_ID ]: Maybe<PatternId>,
    [ PatternStateKeys.DEBUG_MODE ]: boolean,
}

type PatternStateValueTypes =
    Maybe<Patterns> |
    Maybe<PatternId> |
    boolean

type ImmutablePatternState = TypedMap<PatternStateValueTypes, PatternState>

enum PatternStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
    SET_PATTERN_ID = 'SET_PATTERN_ID',
    SET_DEBUG_MODE = 'SET_DEBUG_MODE',
}

interface SetPatterns {
    data: Patterns,
    type: PatternStateActionType.SET_PATTERNS,
}

interface SetPatternId {
    data: PatternId,
    type: PatternStateActionType.SET_PATTERN_ID,
}

interface SetDebugMode {
    data: boolean,
    type: PatternStateActionType.SET_DEBUG_MODE,
}

type PatternStateAction =
    SetPatterns |
    SetPatternId |
    SetDebugMode

export {
    PatternStateKeys,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
}
