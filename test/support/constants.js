import { otherPattern, pattern } from '@musical-patterns/pattern-playroom-test'

const APP_URL = 'http://localhost:8081'

const TEST_MODIFICATION = '2'
const INVALID_TEST_MODIFICATION = '$.&%!'

const PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY = 'patternDurationScalar'
const PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY = 'patternPitchScalar'
const PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY = 'discretePropertyOne'
const PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY = 'discretePropertyTwo'

const TEST_PATTERN_ID = pattern.patternId
const TEST_PATTERN_TITLE = pattern.metadata.formattedName
const TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE = pattern.spec[ PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY ].initial
const TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE = pattern.spec[ PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY ].initial
const TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE = pattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY ].patternSpecPropertyRange[ 1 ]
const TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE = pattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY ].patternSpecPropertyRange[ 0 ]
const TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE = pattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY ].patternSpecPropertyRange[ 0 ]
const TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE = pattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY ].patternSpecPropertyRange[ 1 ]

const OTHER_TEST_PATTERN_ID = otherPattern.patternId
const OTHER_TEST_PATTERN_TITLE = otherPattern.metadata.formattedName
const OTHER_TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE = otherPattern.spec[ PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY ].initial
const OTHER_TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE = otherPattern.spec[ PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY ].initial
const OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE = otherPattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY ].patternSpecPropertyRange[ 0 ]
const OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE = otherPattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY ].patternSpecPropertyRange[ 1 ]
const OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE = otherPattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY ].patternSpecPropertyRange[ 1 ]
const OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE = otherPattern.spec[ PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY ].patternSpecPropertyRange[ 0 ]

const DEFAULT_VIEWPORT_WIDTH = 1600
const DEFAULT_VIEWPORT_HEIGHT = 800

export {
    APP_URL,
    TEST_PATTERN_ID,
    TEST_PATTERN_TITLE,
    TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE,
    TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE,
    OTHER_TEST_PATTERN_ID,
    OTHER_TEST_PATTERN_TITLE,
    OTHER_TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_ONE_MODIFIED_VALUE,
    OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_INITIAL_VALUE,
    OTHER_TEST_PATTERN_SPEC_DISCRETE_PROPERTY_TWO_MODIFIED_VALUE,
    TEST_MODIFICATION,
    INVALID_TEST_MODIFICATION,
    PATTERN_SPEC_CONTINUOUS_PROPERTY_ONE_KEY,
    PATTERN_SPEC_CONTINUOUS_PROPERTY_TWO_KEY,
    PATTERN_SPEC_DISCRETE_PROPERTY_ONE_KEY,
    PATTERN_SPEC_DISCRETE_PROPERTY_TWO_KEY,
    DEFAULT_VIEWPORT_WIDTH,
    DEFAULT_VIEWPORT_HEIGHT,
}
