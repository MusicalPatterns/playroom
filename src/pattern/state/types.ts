import { PatternId, Patterns } from '@musical-patterns/registry'
import { Maybe, TypedMap } from '@musical-patterns/utilities'

enum PatternStateKeys {
    PATTERNS = 'PATTERNS',
    PATTERN_ID = 'PATTERN_ID',
    DEBUG_MODE = 'DEBUG_MODE',
    PATTERNS_PANEL_OPEN = 'PATTERNS_PANEL_OPEN',
}

interface PatternState {
    [ PatternStateKeys.PATTERNS ]: Maybe<Patterns>,
    [ PatternStateKeys.PATTERN_ID ]: Maybe<PatternId>,
    [ PatternStateKeys.DEBUG_MODE ]: boolean,
    [ PatternStateKeys.PATTERNS_PANEL_OPEN ]: boolean,
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
    SET_PATTERNS_PANEL_OPEN = 'SET_PATTERNS_PANEL_OPEN',
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

interface SetPatternsPanelOpen {
    data: boolean,
    type: PatternStateActionType.SET_PATTERNS_PANEL_OPEN,
}

type PatternStateAction =
    SetPatterns |
    SetPatternId |
    SetDebugMode |
    SetPatternsPanelOpen

export {
    PatternStateKeys,
    ImmutablePatternState,
    PatternStateAction,
    PatternStateActionType,
}
