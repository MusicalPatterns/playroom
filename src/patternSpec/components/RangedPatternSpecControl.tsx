import * as React from 'react'
import { SecretSelectorsForTest } from '../../types'
import {
    buildPatternSpecControlEventAttacher,
    PatternSpecControlEventAttacher,
    PatternSpecEventParameters,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { presentPatternSpecKey } from './helpers'
import { PatternSpecControlStates, RangedPatternSpecControlProps } from './types'

const RangedPatternSpecControl: (rangedPatternSpecControlProps: RangedPatternSpecControlProps) => JSX.Element =
    ({ formattedName, patternSpecKey, patternSpecControlsProps }: RangedPatternSpecControlProps): JSX.Element => {
        const {
            handlePatternSpecChange,
            handlePatternSpecKeyboardSubmit,
            handlePatternSpecButtonSubmit,
            handlePatternSpecBlur,
            patternSpecState,
        } = patternSpecControlsProps

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_CONTROLS)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: string = displayedPatternSpec[ patternSpecKey ]
        const invalid: boolean = invalidPatternSpecControls[ patternSpecKey ]
        const unsubmitted: boolean = unsubmittedPatternSpecControls[ patternSpecKey ]
        const disabled: boolean = disabledPatternSpecButtons[ patternSpecKey ]
        const submittedPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const patternSpecEventParameters: PatternSpecEventParameters = { patternSpecKey, patternSpecState }

        const onChange: PatternSpecControlEventAttacher = buildPatternSpecControlEventAttacher({
            patternSpecEventExtractor: handlePatternSpecChange,
            patternSpecEventParameters,
        })
        const onKeyPress: PatternSpecControlEventAttacher = buildPatternSpecControlEventAttacher({
            patternSpecEventExtractor: handlePatternSpecKeyboardSubmit,
            patternSpecEventParameters,
        })
        const onClick: PatternSpecControlEventAttacher = buildPatternSpecControlEventAttacher({
            patternSpecEventExtractor: handlePatternSpecButtonSubmit,
            patternSpecEventParameters,
        })
        const onBlur: PatternSpecControlEventAttacher = buildPatternSpecControlEventAttacher({
            patternSpecEventExtractor: handlePatternSpecBlur,
            patternSpecEventParameters,
        })

        const className: string = invalid ?
            PatternSpecControlStates.INVALID :
            unsubmitted ? PatternSpecControlStates.UNSUBMITTED : PatternSpecControlStates.VALID_AND_SUBMITTED

        return (
            <div {...{ className: 'pattern-spec-control' }}>
                <span {...{
                    className: SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL,
                    id: patternSpecKey,
                }}>{submittedPatternSpecValue}</span>
                <div>{formattedName || presentPatternSpecKey(patternSpecKey)}</div>
                <input {...{ onChange, onKeyPress, value: patternSpecValue, className, onBlur, id: patternSpecKey }}/>
                <button {...{ onClick, disabled, value: patternSpecValue, id: patternSpecKey }}>submit</button>
            </div>
        )
    }

export default RangedPatternSpecControl
