import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePatternSpecState, PatternSpecStateKeys } from './types'

const initialPatternSpecState: ImmutablePatternSpecState = typedMap({
    [ PatternSpecStateKeys.DEFAULT_PATTERN_SPEC ]: {},
    [ PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS ]: {},
    [ PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC ]: {},
    [ PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES ]: {},
    [ PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC ]: {},
    [ PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS ]: {},
    [ PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES ]: {},
    [ PatternSpecStateKeys.VALIDATION_FUNCTION ]: undefined,
    [ PatternSpecStateKeys.PRESETS ]: undefined,
})

export {
    initialPatternSpecState,
}
