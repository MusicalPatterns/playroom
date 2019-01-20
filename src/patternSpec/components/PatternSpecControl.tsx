import { PatternSpec, PatternSpecPropertyType } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValue, SecretSelectorsForTest } from '../../types'
import {
    buildPatternSpecControlEventAttacher,
    PatternSpecControlEventAttacher,
    PatternSpecEventParameters,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { InvalidPatternSpecMessages, PatternSpecControlBooleanStates } from '../types'
import { buildControl } from './buildControl'
import { presentPatternSpecKey, stringifyIfNecessary } from './helpers'
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
        const { patternSpecPropertyType: propertyType, constraint, formattedName } = patternSpecPropertyAttributes

        const displayedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecMessages: InvalidPatternSpecMessages =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES)
        const disabledPatternSpecButtons: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const unsubmittedPatternSpecControls: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.UNSUBMITTED_PATTERN_SPEC_CONTROLS)
        const submittedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const patternSpecValue: DomValue = displayedPatternSpec[ patternSpecKey ] as DomValue
        const invalidMessage: Maybe<string> = invalidPatternSpecMessages[ patternSpecKey ]
        const unsubmitted: boolean = !!unsubmittedPatternSpecControls[ patternSpecKey ]
        const disabled: boolean = !!disabledPatternSpecButtons[ patternSpecKey ]
        const submittedPatternSpecValue: DomValue = submittedPatternSpec[ patternSpecKey ] as DomValue

        const patternSpecEventParameters: PatternSpecEventParameters = {
            isToggle: propertyType === PatternSpecPropertyType.TOGGLED,
            patternSpecKey,
            patternSpecState,
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

        const className: string = !!invalidMessage ?
            PatternSpecControlStates.INVALID :
            unsubmitted ? PatternSpecControlStates.UNSUBMITTED : PatternSpecControlStates.VALID_AND_SUBMITTED
        const controlProps: ControlProps = { className, onBlur, onChange, onKeyPress, patternSpecKey, patternSpecValue }
        const control: JSX.Element[] = buildControl({ propertyType, controlProps, constraint })

        const secretClassName: string = SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL

        return (
            <div {...{ className: 'pattern-spec-control', id: patternSpecKey }}>
                <span {...{ className: secretClassName }}>{stringifyIfNecessary(submittedPatternSpecValue)}</span>
                <div>{formattedName || presentPatternSpecKey(patternSpecKey)}</div>
                {control}
                <button {...{
                    checked: patternSpecValue,
                    disabled,
                    id: patternSpecKey,
                    onClick,
                    value: patternSpecValue,
                }}>submit
                </button>
                {invalidMessage && <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>}
            </div>
        )
    }

export default PatternSpecControl
