// tslint:disable no-magic-numbers

import {
    Configurations,
    Id,
    OptionedConstraint,
    Preset,
    RangedConstraint,
    StandardSpec,
    StringedConstraint,
} from '@musical-patterns/pattern'
import { patterns } from '@musical-patterns/pattern-playroom-test'
import { Ms, ObjectOf, to } from '@musical-patterns/utilities'
// @ts-ignore
import { port } from '../../webpack.port'

const {
    [ Id.PLAYROOM_TEST_SPEC_CONTROLS ]: playroomTestSpecControls,
    [ Id.PLAYROOM_TEST_POST ]: playroomTestPost,
    [ Id.PLAYROOM_TEST_TIME_CONTROLS ]: playroomTestTimeControls,
    [ Id.PLAYROOM_TEST_ONLY_PATTERN_PARTICULAR_SPECS ]: playroomTestOnlyPatternParticularSpecs,
    [ Id.PLAYROOM_TEST_ONLY_STANDARD_SPECS ]: playroomTestOnlyStandardSpecs,
    [ Id.PLAYROOM_TEST_VALIDATION ]: playroomTestValidation,
    [ Id.PLAYROOM_TEST_PRESETS ]: playroomTestPresets,
    [ Id.PLAYROOM_TEST_LONG_DURATION ]: playroomTestLongDuration,
} = patterns

const APP_URL: string = `http://localhost:${port}`

const VALID_TEST_MODIFICATION: string = '2'
const OUT_OF_RANGE_INVALID_TEST_MODIFICATION: string = '3'
const BAD_FORMAT_INVALID_TEST_MODIFICATION: string = 'e'

const RANGED_SPEC_ONE_KEY: string = StandardSpec.BASE_DURATION
const RANGED_SPEC_TWO_KEY: string = StandardSpec.BASE_FREQUENCY
const OPTIONED_SPEC_ONE_KEY: string = 'optionedSpecOne'
const OPTIONED_SPEC_TWO_KEY: string = 'optionedSpecTwo'
const STRINGED_SPEC_KEY: string = 'stringedSpec'
const TOGGLED_SPEC_KEY: string = 'toggledSpec'
const ARRAYED_SPEC_KEY: string = 'arrayedSpec'
const ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY: string = 'arrayedSpecWithInitialFieldValue'

const SPEC_CONTROLS_PATTERN_ID: Id = playroomTestSpecControls!.id
const SPEC_CONTROLS_PATTERN_TITLE: string = playroomTestSpecControls!.metadata.formattedName!
const SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE: number =
    playroomTestSpecControls!.spec.initial[ RANGED_SPEC_ONE_KEY ] as number
const specControlsPatternConfigurations: Configurations = playroomTestSpecControls!.spec.configurations
const specControlsPatternRangedConstraint: RangedConstraint =
    specControlsPatternConfigurations[ RANGED_SPEC_ONE_KEY ].constraint as RangedConstraint
const SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_MAX_VALUE: number = specControlsPatternRangedConstraint.max as number
const SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE: number =
    playroomTestSpecControls!.spec.initial[ RANGED_SPEC_TWO_KEY ] as number
const SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE: string =
    playroomTestSpecControls!.spec.initial[ OPTIONED_SPEC_ONE_KEY ] as string
const specControlsPatternOptionedSpecOneConstraint: OptionedConstraint =
    specControlsPatternConfigurations[ OPTIONED_SPEC_ONE_KEY ].constraint as OptionedConstraint
const SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE: string =
    specControlsPatternOptionedSpecOneConstraint[ 0 ].value
const SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE: string =
    playroomTestSpecControls!.spec.initial[ OPTIONED_SPEC_TWO_KEY ] as string
const specControlsPatternOptionedSpecTwoConstraint: OptionedConstraint =
    specControlsPatternConfigurations[ OPTIONED_SPEC_TWO_KEY ].constraint as OptionedConstraint
const SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE: string =
    specControlsPatternOptionedSpecTwoConstraint[ 1 ].value
const SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE: string =
    playroomTestSpecControls!.spec.initial[ STRINGED_SPEC_KEY ] as string
const specControlsPatternStringedSpecConstraint: StringedConstraint =
    specControlsPatternConfigurations[ STRINGED_SPEC_KEY ].constraint as StringedConstraint
const SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MAX_LENGTH: number =
    specControlsPatternStringedSpecConstraint.maxLength as number
const SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MIN_LENGTH: number =
    specControlsPatternStringedSpecConstraint.minLength as number
const SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_INITIAL_VALUE: boolean =
    playroomTestSpecControls!.spec.initial[ TOGGLED_SPEC_KEY ] as boolean
const SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE: boolean =
    !SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_INITIAL_VALUE
const SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE: number[] =
    playroomTestSpecControls!.spec.initial[ ARRAYED_SPEC_KEY ] as number[]
const SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE: number[] =
    playroomTestSpecControls!.spec.initial[ ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY ] as number[]
const SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE: number =
    playroomTestSpecControls!.spec.configurations[ ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY ].arrayedNewFieldInitialValue as number

const POST_PATTERN_ID: Id = playroomTestPost!.id
const POST_PATTERN_TITLE: string = playroomTestPost!.metadata.formattedName!
const POST_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE: number =
    playroomTestPost!.spec.initial[ RANGED_SPEC_ONE_KEY ] as number
const POST_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE: number =
    playroomTestPost!.spec.initial[ RANGED_SPEC_TWO_KEY ] as number
const POST_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE: string =
    playroomTestPost!.spec.initial[ OPTIONED_SPEC_ONE_KEY ] as string
const postPatternConfigurations: Configurations = playroomTestPost!.spec.configurations
const postPatternOptionedSpecOneConstraint: OptionedConstraint =
    postPatternConfigurations[ OPTIONED_SPEC_ONE_KEY ].constraint as OptionedConstraint
const POST_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE: string = postPatternOptionedSpecOneConstraint[ 1 ].value
const POST_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE: string =
    playroomTestPost!.spec.initial[ OPTIONED_SPEC_TWO_KEY ] as string
const postPatternOptionedSpecTwoConstraint: OptionedConstraint =
    postPatternConfigurations[ OPTIONED_SPEC_TWO_KEY ].constraint as OptionedConstraint
const POST_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE: string = postPatternOptionedSpecTwoConstraint[ 0 ].value

const LONG_DURATION_PATTERN_ID: string = playroomTestLongDuration!.id

const LONG_ENOUGH_FOR_TIME_TO_PASS: Ms = to.Ms(100)
const LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET: Ms = to.Ms(200)
const A_BIT_LONGER: Ms = to.Ms(1000)
const EVEN_A_BIT_LONGER: Ms = to.Ms(2000)

const TIME_CONTROLS_PATTERN_ID: Id = playroomTestTimeControls!.id

const ONLY_PATTERN_PARTICULAR_SPECS_PATTERN_ID: Id = playroomTestOnlyPatternParticularSpecs!.id
const ONLY_STANDARD_SPECS_PATTERN_ID: Id = playroomTestOnlyStandardSpecs!.id

const VALIDATION_PATTERN_ID: Id = playroomTestValidation!.id

const PRESETS_PATTERN_ID: Id = playroomTestPresets!.id
const PRESET_ONE_NAME: string = 'presetOne'
const PRESET_TWO_NAME: string = 'presetTwo'
const presets: ObjectOf<Preset> = playroomTestPresets!.spec.presets as ObjectOf<Preset>
const PRESET_ONE_SPEC_ONE_VALUE: string = presets.presetOne.specs[ OPTIONED_SPEC_ONE_KEY ] as string
const PRESET_ONE_SPEC_TWO_VALUE: string = presets.presetOne.specs[ OPTIONED_SPEC_TWO_KEY ] as string
const PRESET_TWO_SPEC_ONE_VALUE: string = presets.presetTwo.specs[ OPTIONED_SPEC_ONE_KEY ] as string
const PRESET_TWO_SPEC_TWO_VALUE: string = presets.presetTwo.specs[ OPTIONED_SPEC_TWO_KEY ] as string

export {
    APP_URL,
    SPEC_CONTROLS_PATTERN_ID,
    SPEC_CONTROLS_PATTERN_TITLE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_ONE_MAX_VALUE,
    SPEC_CONTROLS_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_TOGGLED_SPEC_MODIFIED_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_INITIAL_FIELD_VALUE,
    POST_PATTERN_ID,
    POST_PATTERN_TITLE,
    POST_PATTERN_RANGED_SPEC_TWO_INITIAL_VALUE,
    POST_PATTERN_RANGED_SPEC_ONE_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_INITIAL_VALUE,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MAX_LENGTH,
    SPEC_CONTROLS_PATTERN_STRINGED_SPEC_ONE_MIN_LENGTH,
    POST_PATTERN_OPTIONED_SPEC_ONE_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_SPEC_ONE_MODIFIED_VALUE,
    POST_PATTERN_OPTIONED_SPEC_TWO_INITIAL_VALUE,
    POST_PATTERN_OPTIONED_SPEC_TWO_MODIFIED_VALUE,
    VALID_TEST_MODIFICATION,
    OUT_OF_RANGE_INVALID_TEST_MODIFICATION,
    BAD_FORMAT_INVALID_TEST_MODIFICATION,
    RANGED_SPEC_ONE_KEY,
    RANGED_SPEC_TWO_KEY,
    OPTIONED_SPEC_ONE_KEY,
    OPTIONED_SPEC_TWO_KEY,
    STRINGED_SPEC_KEY,
    TOGGLED_SPEC_KEY,
    ARRAYED_SPEC_KEY,
    ARRAYED_SPEC_WITH_INITIAL_FIELD_VALUE_KEY,
    LONG_ENOUGH_FOR_TIME_TO_PASS,
    LONG_ENOUGH_FOR_TIME_TO_HAVE_BEEN_RESET,
    A_BIT_LONGER,
    TIME_CONTROLS_PATTERN_ID,
    ONLY_PATTERN_PARTICULAR_SPECS_PATTERN_ID,
    ONLY_STANDARD_SPECS_PATTERN_ID,
    VALIDATION_PATTERN_ID,
    PRESETS_PATTERN_ID,
    LONG_DURATION_PATTERN_ID,
    PRESET_ONE_SPEC_ONE_VALUE,
    PRESET_ONE_SPEC_TWO_VALUE,
    PRESET_TWO_SPEC_ONE_VALUE,
    PRESET_TWO_SPEC_TWO_VALUE,
    PRESET_ONE_NAME,
    PRESET_TWO_NAME,
    EVEN_A_BIT_LONGER,
}
