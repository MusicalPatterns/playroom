import { StandardSpecProperties } from '@musical-patterns/pattern'
import { patterns } from '@musical-patterns/pattern-playroom-test'
import { Id } from '@musical-patterns/registry'

const {
    [ Id.PLAYROOM_TEST_SPEC_CONTROLS ]: playroomTestSpecControls,
    [ Id.PLAYROOM_TEST_POST ]: playroomTestPost,
    [ Id.PLAYROOM_TEST_TIME_CONTROLS ]: playroomTestTimeControls,
    [ Id.PLAYROOM_TEST_ONLY_PATTERN_PARTICULAR_SPEC ]: playroomTestOnlyPatternParticularSpec,
    [ Id.PLAYROOM_TEST_ONLY_STANDARD_SPEC ]: playroomTestOnlyStandardSpec,
    [ Id.PLAYROOM_TEST_VALIDATION ]: playroomTestValidation,
    [ Id.PLAYROOM_TEST_PRESETS ]: playroomTestPresets,
} = patterns

const APP_URL = 'http://localhost:8081'

const VALID_TEST_MODIFICATION = '2'
const OUT_OF_RANGE_INVALID_TEST_MODIFICATION = '3'
const BAD_FORMAT_INVALID_TEST_MODIFICATION = 'e'

const SPEC_RANGED_PROPERTY_ONE_KEY = StandardSpecProperties.PATTERN_DURATION_SCALAR
const SPEC_RANGED_PROPERTY_TWO_KEY = StandardSpecProperties.PATTERN_PITCH_SCALAR
const SPEC_OPTIONED_PROPERTY_ONE_KEY = 'optionedPropertyOne'
const SPEC_OPTIONED_PROPERTY_TWO_KEY = 'optionedPropertyTwo'
const SPEC_TOGGLED_PROPERTY_KEY = 'toggledProperty'

const SPEC_CONTROLS_PATTERN_ID = playroomTestSpecControls.id
const SPEC_CONTROLS_PATTERN_TITLE = playroomTestSpecControls.metadata.formattedName
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE = playroomTestSpecControls.specData.initial[ SPEC_RANGED_PROPERTY_ONE_KEY ]
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE = playroomTestSpecControls.specData.attributes[ SPEC_RANGED_PROPERTY_ONE_KEY ].constraint.max
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE = playroomTestSpecControls.specData.initial[ SPEC_RANGED_PROPERTY_TWO_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE = playroomTestSpecControls.specData.initial[ SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE = playroomTestSpecControls.specData.attributes[ SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint[ 0 ].key
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE = playroomTestSpecControls.specData.initial[ SPEC_OPTIONED_PROPERTY_TWO_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE = playroomTestSpecControls.specData.attributes[ SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint[ 1 ].key
const SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE = playroomTestSpecControls.specData.initial[ SPEC_TOGGLED_PROPERTY_KEY ]
const SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE = !SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE

const POST_PATTERN_ID = playroomTestPost.id
const POST_PATTERN_TITLE = playroomTestPost.metadata.formattedName
const POST_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPost.specData.initial[ SPEC_RANGED_PROPERTY_ONE_KEY ]
const POST_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPost.specData.initial[ SPEC_RANGED_PROPERTY_TWO_KEY ]
const POST_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPost.specData.initial[ SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const POST_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE = playroomTestPost.specData.attributes[ SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint[ 1 ].key
const POST_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPost.specData.initial[ SPEC_OPTIONED_PROPERTY_TWO_KEY ]
const POST_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE = playroomTestPost.specData.attributes[ SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint[ 0 ].key

const DEFAULT_VIEWPORT_WIDTH = 1600
const DEFAULT_VIEWPORT_HEIGHT = 800

const LONG_ENOUGH_FOR_TIME_TO_PASS = 100
const LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET = 100
const A_BIT_LONGER = 1000

const TIME_CONTROLS_PATTERN_ID = playroomTestTimeControls.id

const ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID = playroomTestOnlyPatternParticularSpec.id
const ONLY_STANDARD_SPEC_PATTERN_ID = playroomTestOnlyStandardSpec.id

const VALIDATION_PATTERN_ID = playroomTestValidation.id

const PRESETS_PATTERN_ID = playroomTestPresets.id
const PRESET_ONE_PROPERTY_ONE_VALUE = playroomTestPresets.specData.presets.presetOne[ SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const PRESET_ONE_PROPERTY_TWO_VALUE = playroomTestPresets.specData.presets.presetOne[ SPEC_OPTIONED_PROPERTY_TWO_KEY ]
const PRESET_TWO_PROPERTY_ONE_VALUE = playroomTestPresets.specData.presets.presetTwo[ SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const PRESET_TWO_PROPERTY_TWO_VALUE = playroomTestPresets.specData.presets.presetTwo[ SPEC_OPTIONED_PROPERTY_TWO_KEY ]

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
    POST_PATTERN_ID,
    POST_PATTERN_TITLE,
    POST_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    POST_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    POST_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    VALID_TEST_MODIFICATION,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    DEFAULT_VIEWPORT_WIDTH,
    DEFAULT_VIEWPORT_HEIGHT,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    A_BIT_LONGER,
    TIME_CONTROLS_PATTERN_ID,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    VALIDATION_PATTERN_ID,
    PRESETS_PATTERN_ID,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
}
