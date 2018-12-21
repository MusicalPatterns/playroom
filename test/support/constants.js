import { pattern } from '@musical-patterns/pattern-playroom-test'

const TEST_PATTERN_ID = pattern.id
const APP_URL = 'http://localhost:8081'
const TEST_PATTERN_SPEC_PROPERTY_ONE_KEY = 'patternDurationScalar'
const TEST_PATTERN_SPEC_PROPERTY_TWO_KEY = 'patternPitchScalar'
const TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE = pattern.spec[ TEST_PATTERN_SPEC_PROPERTY_ONE_KEY ]
const TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE = pattern.spec[ TEST_PATTERN_SPEC_PROPERTY_TWO_KEY ]
const TEST_MODIFICATION = '2'
const INVALID_TEST_MODIFICATION = '$.&%!'

export {
    APP_URL,
    TEST_PATTERN_ID,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_MODIFICATION,
    INVALID_TEST_MODIFICATION,
    TEST_PATTERN_SPEC_PROPERTY_ONE_KEY,
    TEST_PATTERN_SPEC_PROPERTY_TWO_KEY,
}
