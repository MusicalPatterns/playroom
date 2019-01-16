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
import { OptionedPatternSpecControlProps, PatternSpecControlStates } from './types'

const OptionedPatternSpecControl: (props: OptionedPatternSpecControlProps) => JSX.Element =
    (props: OptionedPatternSpecControlProps): JSX.Element => {
        const { formattedName, patternSpecKey, patternSpecControlsProps, options } = props
        const {
            handlePatternSpecChange,
            handlePatternSpecKeyboardSubmit,
            handlePatternSpecButtonSubmit,
            handlePatternSpecBlur,
            patternSpecState,
        } = patternSpecControlsProps

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: string = displayedPatternSpec[ patternSpecKey ]
        const unsubmitted: boolean = unsubmittedPatternSpecControls[ patternSpecKey ]
        const disabled: boolean = disabledPatternSpecButtons[ patternSpecKey ]
        const submittedPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const patternSpecEventParameters: PatternSpecEventParameters = {
            patternSpecKey,
            patternSpecState,
            select: true,
        }

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

        const className: string =
            unsubmitted ? PatternSpecControlStates.UNSUBMITTED : PatternSpecControlStates.VALID_AND_SUBMITTED

        const optionElements: JSX.Element[] = options.map((option: string, key: number): JSX.Element =>
            <option {...{ key, value: option }}>{option}</option>)

        return (
            <div {...{ className: 'pattern-spec-control' }}>
                <span {...{
                    className: SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL,
                    id: patternSpecKey,
                }}>{
                    // tslint:disable-next-line:no-unsafe-any
                    JSON.parse(submittedPatternSpecValue)
                        .replace(/"/g, '')}</span>
                <div>{formattedName || presentPatternSpecKey(patternSpecKey)}</div>
                <select {...{
                    className,
                    id: patternSpecKey,
                    onBlur,
                    onChange,
                    onKeyPress,
                    // tslint:disable-next-line:no-unsafe-any
                    value: JSON.parse(patternSpecValue),
                }}>{optionElements}</select>
                <button {...{ onClick, disabled, value: patternSpecValue, id: patternSpecKey }}>submit</button>
            </div>
        )
    }

export default OptionedPatternSpecControl
