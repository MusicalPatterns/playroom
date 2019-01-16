import * as React from 'react'
import { SecretSelectorsForTest } from '../../types'
import {
    buildPatternSpecInputEventAttacher,
    PatternSpecEventParameters,
    PatternSpecInputEventAttacher,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { presentPatternSpecKey } from './helpers'
import { PatternSpecInputStates, PatternSpecSelectProps } from './types'

const PatternSpecSelect: (props: PatternSpecSelectProps) => JSX.Element =
    ({ patternSpecKey, patternSpecInputsProps, options }: PatternSpecSelectProps): JSX.Element => {
        const {
            handlePatternSpecChange,
            handlePatternSpecKeyboardSubmit,
            handlePatternSpecButtonSubmit,
            handlePatternSpecBlur,
            patternSpecState,
        } = patternSpecInputsProps

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const disabledPatternSpecButtons: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: string = displayedPatternSpec[ patternSpecKey ]
        const unsubmitted: boolean = unsubmittedPatternSpecInputs[ patternSpecKey ]
        const disabled: boolean = disabledPatternSpecButtons[ patternSpecKey ]
        const submittedPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const patternSpecEventParameters: PatternSpecEventParameters = {
            patternSpecKey,
            patternSpecState,
            select: true,
        }

        const onChange: PatternSpecInputEventAttacher = buildPatternSpecInputEventAttacher({
            patternSpecEventExtractor: handlePatternSpecChange,
            patternSpecEventParameters,
        })
        const onKeyPress: PatternSpecInputEventAttacher = buildPatternSpecInputEventAttacher({
            patternSpecEventExtractor: handlePatternSpecKeyboardSubmit,
            patternSpecEventParameters,
        })
        const onClick: PatternSpecInputEventAttacher = buildPatternSpecInputEventAttacher({
            patternSpecEventExtractor: handlePatternSpecButtonSubmit,
            patternSpecEventParameters,
        })
        const onBlur: PatternSpecInputEventAttacher = buildPatternSpecInputEventAttacher({
            patternSpecEventExtractor: handlePatternSpecBlur,
            patternSpecEventParameters,
        })

        const className: string =
            unsubmitted ? PatternSpecInputStates.UNSUBMITTED : PatternSpecInputStates.VALID_AND_SUBMITTED

        const optionElements: JSX.Element[] = options.map((option: string, key: number): JSX.Element =>
            <option {...{ key, value: option }}>{option}</option>)

        return (
            <div {...{ className: 'pattern-spec-input' }}>
                <span {...{
                    className: SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT,
                    id: patternSpecKey,
                }}>{
                    // tslint:disable-next-line:no-unsafe-any
                    JSON.parse(submittedPatternSpecValue)
                        .replace(/"/g, '')}</span>
                <div>{presentPatternSpecKey(patternSpecKey)}</div>
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

export default PatternSpecSelect
