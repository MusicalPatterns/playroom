import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePatternState, PatternStateKeys } from './types'

const initialPatternState: ImmutablePatternState = typedMap({
    [ PatternStateKeys.PATTERNS ]: undefined,
    [ PatternStateKeys.PATTERN_ID ]: undefined,
})

export {
    initialPatternState,
}
