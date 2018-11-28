import { PatternId } from '@musical-patterns/shared'

enum PatternIdStateActionType {
    SET_PATTERN_ID = 'SET_PATTERN_ID',
}

interface SetPatternId {
    data: PatternId,
    type: PatternIdStateActionType.SET_PATTERN_ID,
}

type PatternIdStateAction =
    SetPatternId

export {
    PatternIdStateAction,
    PatternIdStateActionType,
}
