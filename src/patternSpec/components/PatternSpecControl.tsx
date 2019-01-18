import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { SecretSelectorsForTest } from '../../types'
import {
    buildPatternSpecControlEventAttacher,
    PatternSpecControlEventAttacher,
    PatternSpecEventParameters,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { InvalidPatternSpecMessages, StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { buildControl } from './buildControl'
import { presentPatternSpecKey } from './helpers'
import { ControlProps, PatternSpecControlProps, PatternSpecControlStates } from './types'

const PatternSpecControl: (patternSpecControlProps: PatternSpecControlProps) => JSX.Element =
    (patternSpecControlProps: PatternSpecControlProps): JSX.Element => {
        const { patternSpecKey, patternSpecControlsProps, patternSpecPropertyAttributes } = patternSpecControlProps
        const {
            handlePatternSpecChange,
            handlePatternSpecKeyboardSubmit,
            handlePatternSpecButtonSubmit,
            handlePatternSpecBlur,
            patternSpecState,
        } = patternSpecControlsProps
        const { patternSpecPropertyType, constraint, formattedName } = patternSpecPropertyAttributes

        const displayedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecMessages: InvalidPatternSpecMessages =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES)
        const disabledPatternSpecButtons: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecControls: StringifiedPatternSpecControlStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const submittedPatternSpec: StringifiedPatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: string = displayedPatternSpec[ patternSpecKey ]
        const invalidMessage: Maybe<string> = invalidPatternSpecMessages[ patternSpecKey ]
        const unsubmitted: boolean = !!unsubmittedPatternSpecControls[ patternSpecKey ]
        const disabled: boolean = !!disabledPatternSpecButtons[ patternSpecKey ]
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

        const className: string = !!invalidMessage ?
            PatternSpecControlStates.INVALID :
            unsubmitted ? PatternSpecControlStates.UNSUBMITTED : PatternSpecControlStates.VALID_AND_SUBMITTED
        const controlProps: ControlProps = { className, onBlur, onChange, onKeyPress, patternSpecKey, patternSpecValue }
        const control: JSX.Element[] = buildControl(patternSpecPropertyType, controlProps, constraint)

        const secretClassName: string = SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL

        return (
            <div {...{ className: 'pattern-spec-control', id: patternSpecKey }}>
                <span {...{ className: secretClassName }}>{submittedPatternSpecValue}</span>
                <div>{formattedName || presentPatternSpecKey(patternSpecKey)}</div>
                {control}
                <button {...{ disabled, id: patternSpecKey, onClick, value: patternSpecValue }}>submit</button>
                {invalidMessage && <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>}
            </div>
        )
    }

export default PatternSpecControl
