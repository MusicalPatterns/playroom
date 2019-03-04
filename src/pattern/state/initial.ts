import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternState, PatternStateKey } from './types'

const initialPatternState: ImmutablePatternState = typedMap<PatternState>({
    [ PatternStateKey.PATTERNS ]: undefined,
    [ PatternStateKey.ID ]: undefined,
    [ PatternStateKey.DEBUG_MODE ]: false,
    [ PatternStateKey.LEFT_COLUMN_OPEN ]: true,
    [ PatternStateKey.RIGHT_COLUMN_OPEN ]: false,
    [ PatternStateKey.PAGE_NAME ]: undefined,
})

export {
    initialPatternState,
}
