// tslint:disable no-magic-numbers

import {
    Id,
    OptionedConstraint,
    Preset,
    RangedConstraint,
    SpecAttributes,
    StandardSpecProperties,
    StringedConstraint,
} from '@musical-patterns/pattern'
import { patterns } from '@musical-patterns/pattern-playroom-test'
import { DictionaryOf, Ms, to } from '@musical-patterns/utilities'
// @ts-ignore
import { port } from '../../webpack.port'

const {
    [ Id.PLAYROOM_TEST_SPEC_CONTROLS ]: playroomTestSpecControls,
    [ Id.PLAYROOM_TEST_POST ]: playroomTestPost,
    [ Id.PLAYROOM_TEST_TIME_CONTROLS ]: playroomTestTimeControls,
    [ Id.PLAYROOM_TEST_ONLY_PATTERN_PARTICULAR_SPEC ]: playroomTestOnlyPatternParticularSpec,
    [ Id.PLAYROOM_TEST_ONLY_STANDARD_SPEC ]: playroomTestOnlyStandardSpec,
    [ Id.PLAYROOM_TEST_VALIDATION ]: playroomTestValidation,
    [ Id.PLAYROOM_TEST_PRESETS ]: playroomTestPresets,
    [ Id.PLAYROOM_TEST_LONG_DURATION ]: playroomTestLongDuration,
} = patterns

const APP_URL: string = `http://localhost:${port}`

const VALID_TEST_MODIFICATION: string = '2'
const OUT_OF_RANGE_INVALID_TEST_MODIFICATION: string = '3'
const BAD_FORMAT_INVALID_TEST_MODIFICATION: string = 'e'

const SPEC_RANGED_PROPERTY_ONE_KEY: string = StandardSpecProperties.BASE_DURATION
const SPEC_RANGED_PROPERTY_TWO_KEY: string = StandardSpecProperties.BASE_FREQUENCY
const SPEC_OPTIONED_PROPERTY_ONE_KEY: string = 'optionedPropertyOne'
const SPEC_OPTIONED_PROPERTY_TWO_KEY: string = 'optionedPropertyTwo'
const SPEC_STRINGED_PROPERTY_KEY: string = 'stringedProperty'
const SPEC_TOGGLED_PROPERTY_KEY: string = 'toggledProperty'
const SPEC_ARRAYED_PROPERTY_KEY: string = 'arrayedProperty'
const SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY: string = 'arrayedPropertyWithInitialElementValue'

const SPEC_CONTROLS_PATTERN_ID: Id = playroomTestSpecControls!.id
const SPEC_CONTROLS_PATTERN_TITLE: string = playroomTestSpecControls!.metadata.formattedName as string
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE: number = playroomTestSpecControls!.specData.initial[ SPEC_RANGED_PROPERTY_ONE_KEY ] as number
const specControlsPatternAttributes: SpecAttributes = playroomTestSpecControls!.specData.attributes
const specControlsPatternRangedConstraint: RangedConstraint = specControlsPatternAttributes[ SPEC_RANGED_PROPERTY_ONE_KEY ].constraint as RangedConstraint
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_ONE_MAX_VALUE: number = specControlsPatternRangedConstraint.max as number
const SPEC_CONTROLS_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE: number = playroomTestSpecControls!.specData.initial[ SPEC_RANGED_PROPERTY_TWO_KEY ] as number
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE: string = playroomTestSpecControls!.specData.initial[ SPEC_OPTIONED_PROPERTY_ONE_KEY ] as string
const specControlsPatternOptionedPropertyOneConstraint: OptionedConstraint = specControlsPatternAttributes[ SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint as OptionedConstraint
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE: string = specControlsPatternOptionedPropertyOneConstraint[ 0 ].key
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE: string = playroomTestSpecControls!.specData.initial[ SPEC_OPTIONED_PROPERTY_TWO_KEY ] as string
const specControlsPatternOptionedPropertyTwoConstraint: OptionedConstraint = specControlsPatternAttributes[ SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint as OptionedConstraint
const SPEC_CONTROLS_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE: string = specControlsPatternOptionedPropertyTwoConstraint[ 1 ].key
const SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_INITIAL_VALUE: string = playroomTestSpecControls!.specData.initial[ SPEC_STRINGED_PROPERTY_KEY ] as string
const specControlsPatternStringedPropertyConstraint: StringedConstraint = specControlsPatternAttributes[ SPEC_STRINGED_PROPERTY_KEY ].constraint as StringedConstraint
const SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MAX_LENGTH: number = specControlsPatternStringedPropertyConstraint.maxLength as number
const SPEC_CONTROLS_PATTERN_STRINGED_PROPERTY_ONE_MIN_LENGTH: number = specControlsPatternStringedPropertyConstraint.minLength as number
const SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE: boolean = playroomTestSpecControls!.specData.initial[ SPEC_TOGGLED_PROPERTY_KEY ] as boolean
const SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_MODIFIED_VALUE: boolean = !SPEC_CONTROLS_PATTERN_TOGGLED_PROPERTY_INITIAL_VALUE
const SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_INITIAL_VALUE: number[] = playroomTestSpecControls!.specData.initial[ SPEC_ARRAYED_PROPERTY_KEY ] as number[]
const SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE: number[] = playroomTestSpecControls!.specData.initial[ SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY ] as number[]
const SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE: number = playroomTestSpecControls!.specData.attributes[ SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY ].arrayedNewElementInitialValue as number

const POST_PATTERN_ID: Id = playroomTestPost!.id
const POST_PATTERN_TITLE: string = playroomTestPost!.metadata.formattedName as string
const POST_PATTERN_RANGED_PROPERTY_ONE_INITIAL_VALUE: number = playroomTestPost!.specData.initial[ SPEC_RANGED_PROPERTY_ONE_KEY ] as number
const POST_PATTERN_RANGED_PROPERTY_TWO_INITIAL_VALUE: number = playroomTestPost!.specData.initial[ SPEC_RANGED_PROPERTY_TWO_KEY ] as number
const POST_PATTERN_OPTIONED_PROPERTY_ONE_INITIAL_VALUE: string = playroomTestPost!.specData.initial[ SPEC_OPTIONED_PROPERTY_ONE_KEY ] as string
const postPatternAttributes: SpecAttributes = playroomTestPost!.specData.attributes
const postPatternOptionedPropertyOneConstraint: OptionedConstraint = postPatternAttributes[ SPEC_OPTIONED_PROPERTY_ONE_KEY ].constraint as OptionedConstraint
const POST_PATTERN_OPTIONED_PROPERTY_ONE_MODIFIED_VALUE: string = postPatternOptionedPropertyOneConstraint[ 1 ].key
const POST_PATTERN_OPTIONED_PROPERTY_TWO_INITIAL_VALUE: string = playroomTestPost!.specData.initial[ SPEC_OPTIONED_PROPERTY_TWO_KEY ] as string
const postPatternOptionedPropertyTwoConstraint: OptionedConstraint = postPatternAttributes[ SPEC_OPTIONED_PROPERTY_TWO_KEY ].constraint as OptionedConstraint
const POST_PATTERN_OPTIONED_PROPERTY_TWO_MODIFIED_VALUE: string = postPatternOptionedPropertyTwoConstraint[ 0 ].key

const LONG_DURATION_PATTERN_ID: string = playroomTestLongDuration!.id

const LONG_ENOUGH_FOR_TIME_TO_PASS: Ms = to.Ms(100)
const LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET: Ms = to.Ms(200)
const A_BIT_LONGER: Ms = to.Ms(1000)
const EVEN_A_BIT_LONGER: Ms = to.Ms(2000)

const TIME_CONTROLS_PATTERN_ID: Id = playroomTestTimeControls!.id

const ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID: Id = playroomTestOnlyPatternParticularSpec!.id
const ONLY_STANDARD_SPEC_PATTERN_ID: Id = playroomTestOnlyStandardSpec!.id

const VALIDATION_PATTERN_ID: Id = playroomTestValidation!.id

const PRESETS_PATTERN_ID: Id = playroomTestPresets!.id
const PRESET_ONE_NAME: string = 'presetOne'
const PRESET_TWO_NAME: string = 'presetTwo'
const presets: DictionaryOf<Preset> = playroomTestPresets!.specData.presets as DictionaryOf<Preset>
const PRESET_ONE_PROPERTY_ONE_VALUE: string = presets.presetOne.spec[ SPEC_OPTIONED_PROPERTY_ONE_KEY ] as string
const PRESET_ONE_PROPERTY_TWO_VALUE: string = presets.presetOne.spec[ SPEC_OPTIONED_PROPERTY_TWO_KEY ] as string
const PRESET_TWO_PROPERTY_ONE_VALUE: string = presets.presetTwo.spec[ SPEC_OPTIONED_PROPERTY_ONE_KEY ] as string
const PRESET_TWO_PROPERTY_TWO_VALUE: string = presets.presetTwo.spec[ SPEC_OPTIONED_PROPERTY_TWO_KEY ] as string

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
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_INITIAL_ELEMENT_VALUE,
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
    SPEC_RANGED_PROPERTY_ONE_KEY,
    SPEC_RANGED_PROPERTY_TWO_KEY,
    SPEC_OPTIONED_PROPERTY_ONE_KEY,
    SPEC_OPTIONED_PROPERTY_TWO_KEY,
    SPEC_STRINGED_PROPERTY_KEY,
    SPEC_TOGGLED_PROPERTY_KEY,
    SPEC_ARRAYED_PROPERTY_KEY,
    SPEC_ARRAYED_PROPERTY_WITH_INITIAL_ELEMENT_VALUE_KEY,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    A_BIT_LONGER,
    TIME_CONTROLS_PATTERN_ID,
    ONLY_PATTERN_PARTICULAR_SPEC_PATTERN_ID,
    ONLY_STANDARD_SPEC_PATTERN_ID,
    VALIDATION_PATTERN_ID,
    PRESETS_PATTERN_ID,
    LONG_DURATION_PATTERN_ID,
    PRESET_ONE_PROPERTY_ONE_VALUE,
    PRESET_ONE_PROPERTY_TWO_VALUE,
    PRESET_TWO_PROPERTY_ONE_VALUE,
    PRESET_TWO_PROPERTY_TWO_VALUE,
    PRESET_ONE_NAME,
    PRESET_TWO_NAME,
    EVEN_A_BIT_LONGER,
}
