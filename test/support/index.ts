export {
    selectSpecControlsPattern,
    selectPostPattern,
    selectLongDurationPattern,
    selectTimeControlsPattern,
    selectValidationPattern,
    selectPresetsPattern,
    selectOnlyStandardSpecPattern,
    selectOnlyPatternParticularSpecPattern,
}from './selectPattern'
export { quickRefresh, refreshPage, refreshForSpecControlsTest }from './refresh'
export { waitForHeadfulQaing, waitLongEnoughForAnimationToComplete } from './wait'
export { selectAboutPageByClickingTitle } from './aboutPage'
export { leftColumnIs } from './leftColumn'
export { openSpecControlsIfNotOpen } from './caret'
export { currentTime, patternDuration, isPlaying, isPaused, hasBeenReset } from './time'
export { clickAdd, clickRemove, noInvalidMessagesAreShown } from './arrayedSpecControls'
export {
    selectOption,
    elementIds,
    elementCount,
    elementExists,
    elementInnerText,
    elementValue,
    elementChecked,
    press,
    loseFocus,
    findElement,
    simulateDesktopViewport,
    simulateMobileViewport,
    clickElement,
    deleteCharacterFromInput,
} from './generic'

export {
    APP_URL,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_TITLE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
    POST_PATTERN_ID,
    POST_PATTERN_TITLE,
    POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH,
    SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    VALID_TEST_MODIFICATION,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    RANGED_PROPERTY_ONE_KEY,
    RANGED_PROPERTY_TWO_KEY,
    OPTIONED_PROPERTY_ONE_KEY,
    OPTIONED_PROPERTY_TWO_KEY,
    STRINGED_PROPERTY_KEY,
    TOGGLED_PROPERTY_KEY,
    ARRAYED_PROPERTY_KEY,
    ARRAYED_PROPERTY_WITH_INITIAL_FIELD_VALUE_KEY,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    A_BIT_LONGER,
    TIME_CONTROLS_PATTERN_ID,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    VALIDATION_PATTERN_ID,
    PRESETS_PATTERN_ID,
    LONG_DURATION_PATTERN_ID,
    PRESET_ONE_NAME,
    PRESET_TWO_NAME,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    EVEN_A_BIT_LONGER,
} from './constants'
