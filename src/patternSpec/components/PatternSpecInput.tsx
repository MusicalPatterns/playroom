import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { SecretSelectorsForTest } from '../../types'
import {
    buildPatternSpecInputEventAttacher,
    PatternSpecEventParameters,
    PatternSpecInputEventAttacher,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { PatternSpecInputProps, PatternSpecInputStates } from './types'

const presentPatternSpecKey: (patternSpecKey: string) => string =
    (patternSpecKey: string): string =>
        camelCaseToLowerCase(patternSpecKey)
            .replace(/pattern /g, '')

const PatternSpecInput: (patternSpecInputProps: PatternSpecInputProps) => JSX.Element =
    (patternSpecInputProps: PatternSpecInputProps): JSX.Element => {
        const { patternSpecKey, patternSpecInputsProps } = patternSpecInputProps
        const {
            handlePatternSpecChange,
            handlePatternSpecKeyboardSubmit,
            handlePatternSpecButtonSubmit,
            handlePatternSpecBlur,
            patternSpecState,
        } = patternSpecInputsProps

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_INPUTS)
        const disabledPatternSpecButtons: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecInputs: StringifiedPatternSpecInputStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_INPUTS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: string = displayedPatternSpec[ patternSpecKey ]
        const invalid: boolean = invalidPatternSpecInputs[ patternSpecKey ]
        const unsubmitted: boolean = unsubmittedPatternSpecInputs[ patternSpecKey ]
        const disabled: boolean = disabledPatternSpecButtons[ patternSpecKey ]
        const submittedPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const patternSpecEventParameters: PatternSpecEventParameters = { patternSpecKey, patternSpecState }

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

        const className: string = invalid ?
            PatternSpecInputStates.INVALID :
            unsubmitted ? PatternSpecInputStates.UNSUBMITTED : PatternSpecInputStates.VALID_AND_SUBMITTED

        return (
            <div {...{ className: 'pattern-spec-input' }}>
                <span {...{
                    className: SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_INPUT,
                    id: patternSpecKey,
                }}>{submittedPatternSpecValue}</span>
                <div>{presentPatternSpecKey(patternSpecKey)}</div>
                <input {...{ onChange, onKeyPress, value: patternSpecValue, className, onBlur, id: patternSpecKey }}/>
                <button {...{ onClick, disabled, value: patternSpecValue, id: patternSpecKey }}>submit</button>
            </div>
        )
    }

export default PatternSpecInput
