import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternState, PatternStateKeys } from './types'

const initialPatternState: ImmutablePatternState = typedMap<PatternState>({
    [ PatternStateKeys.PATTERNS ]: undefined,
    [ PatternStateKeys.ID ]: undefined,
    [ PatternStateKeys.DEBUG_MODE ]: false,
    [ PatternStateKeys.LEFT_COLUMN_OPEN ]: true,
    [ PatternStateKeys.RIGHT_COLUMN_OPEN ]: false,
    [ PatternStateKeys.PAGE_NAME ]: undefined,
})

export {
    initialPatternState,
}
