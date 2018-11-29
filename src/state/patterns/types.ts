import { Patterns } from '@musical-patterns/pattern'

enum PatternsStateActionType {
    SET_PATTERNS = 'SET_PATTERNS',
}

interface SetPatterns {
    data: Patterns,
    type: PatternsStateActionType.SET_PATTERNS,
}

type PatternsStateAction =
    SetPatterns

export {
    PatternsStateAction,
    PatternsStateActionType,
}
