import {
    TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
    TEST_PATTERN_ID,
    TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
    TEST_PATTERN_SPEC_PROPERTY_ONE_KEY,
    TEST_PATTERN_SPEC_PROPERTY_TWO_KEY,
} from '../constants'

const patternsForTest = {
    [TEST_PATTERN_ID]: {
        metadata: {
            musicalIdeaIllustrated: 'testing 1, 2, 3...',
        },
        spec: {
            [TEST_PATTERN_SPEC_PROPERTY_ONE_KEY]: TEST_PATTERN_SPEC_PROPERTY_ONE_VALUE,
            [TEST_PATTERN_SPEC_PROPERTY_TWO_KEY]: TEST_PATTERN_SPEC_PROPERTY_TWO_VALUE,
        },
        material: {
            buildEntitiesFunction: () => [],
            buildScalesFunction: () => [],
        },
    },
}

export {
    patternsForTest,
}