import { StandardPatternSpecProperties } from '@musical-patterns/pattern'
import { patterns } from '@musical-patterns/pattern-playroom-test'
import { PatternId } from '@musical-patterns/registry'

const {
    [ PatternId.PLAYROOM_TEST_PATTERN_SPEC_CONTROLS ]: playroomTestPatternSpecControls,
    [ PatternId.PLAYROOM_TEST_POST ]: playroomTestPost,
    [ PatternId.PLAYROOM_TEST_TIME_CONTROLS ]: playroomTestTimeControls,
    [ PatternId.PLAYROOM_TEST_ONLY_PATTERN_SPECIFIC_SPEC ]: playroomTestOnlyPatternSpecificSpec,
    [ PatternId.PLAYROOM_TEST_ONLY_STANDARD_SPEC ]: playroomTestOnlyStandardSpec,
} = patterns

const APP_URL = 'http://localhost:8081'

const VALID_TEST_MODIFICATION = '2'
const OUT_OF_RANGE_INVALID_TEST_MODIFICATION = '3'
const BAD_FORMAT_INVALID_TEST_MODIFICATION = 'e'

const PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY = StandardPatternSpecProperties.PATTERN_DURATION_SCALAR
const PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY = StandardPatternSpecProperties.PATTERN_PITCH_SCALAR
const PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY = 'optionedPropertyOne'
const PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY = 'optionedPropertyTwo'

const SPEC_CONTROLS_PATTERN_ID = playroomTestPatternSpecControls.patternId
const SPEC_CONTROLS_PATTERN_TITLE = playroomTestPatternSpecControls.metadata.formattedName
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPatternSpecControls.specData.specs.initial[ PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY ]
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPatternSpecControls.specData.specs.initial[ PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPatternSpecControls.specData.specs.initial[ PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE = playroomTestPatternSpecControls.specData.attributes[ PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint[ 0 ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPatternSpecControls.specData.specs.initial[ PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY ]
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE = playroomTestPatternSpecControls.specData.attributes[ PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint[ 1 ]

const POST_PATTERN_ID = playroomTestPost.patternId
const POST_PATTERN_TITLE = playroomTestPost.metadata.formattedName
const POST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPost.specData.specs.initial[ PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY ]
const POST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPost.specData.specs.initial[ PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY ]
const POST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE = playroomTestPost.specData.specs.initial[ PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY ]
const POST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE = playroomTestPost.specData.attributes[ PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint[ 1 ]
const POST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE = playroomTestPost.specData.specs.initial[ PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY ]
const POST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE = playroomTestPost.specData.attributes[ PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint[ 0 ]

const DEFAULT_VIEWPORT_WIDTH = 1600
const DEFAULT_VIEWPORT_HEIGHT = 800

const LONG_ENOUGH_FOR_TIME_TO_PASS = 100
const LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET = 100
const A_BIT_LONGER = 1000

const TIME_CONTROLS_PATTERN_ID = playroomTestTimeControls.patternId

const ONLY_PATTERN_SPECIFIC_SPEC_PATTERN_ID = playroomTestOnlyPatternSpecificSpec.patternId
const ONLY_STANDARD_SPEC_PATTERN_ID = playroomTestOnlyStandardSpec.patternId

export {
    APP_URL,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_TITLE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    POST_PATTERN_ID,
    POST_PATTERN_TITLE,
    POST_PATTERN_SPEC_RANGED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_SPEC_RANGED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_INITIAL_VALUE,
    POST_PATTERN_SPEC_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE,
    POST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_INITIAL_VALUE,
    POST_PATTERN_SPEC_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE,
    VALID_TEST_MODIFICATION,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_RANGED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_RANGED_PROPERTY_TWO_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_ONE_KEY,
    PATTERN_SPEC_OPTIONED_PROPERTY_TWO_KEY,
    DEFAULT_VIEWPORT_WIDTH,
    DEFAULT_VIEWPORT_HEIGHT,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    A_BIT_LONGER,
    TIME_CONTROLS_PATTERN_ID,
    ONLY_PATTERN_SPECIFIC_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
}
