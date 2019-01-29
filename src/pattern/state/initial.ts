import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternState, PatternStateKeys } from './types'

const initialPatternState: ImmutablePatternState = typedMap<PatternState>({
    [ PatternStateKeys.PATTERNS ]: undefined,
    [ PatternStateKeys.ID ]: undefined,
    [ PatternStateKeys.DEBUG_MODE ]: false,
    [ PatternStateKeys.PATTERNS_PANEL_OPEN ]: true,
})

export {
    initialPatternState,
}
