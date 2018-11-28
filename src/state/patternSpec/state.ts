import { typedMap } from '@musical-patterns/shared'
import { ImmutablePatternSpecState, PatternSpecStateKeys } from './types'

const initialPatternSpecState: ImmutablePatternSpecState = typedMap({
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: {},
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: {},
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS ]: {},
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: {},
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS ]: {},
})

export {
    initialPatternSpecState,
}
