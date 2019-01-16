import { OptionedConstraint, PatternSpecPropertyType } from '@musical-patterns/pattern'
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
import OptionedPatternSpecControl from './OptionedPatternSpecControl'
import RangedPatternSpecControl from './RangedPatternSpecControl'
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
        let submittedPatternSpecValue: string = submittedPatternSpec[ patternSpecKey ]

        const patternSpecPropertyTypeIsOptioned: boolean = patternSpecPropertyType === PatternSpecPropertyType.OPTIONED
        const patternSpecEventParameters: PatternSpecEventParameters = {
            patternSpecKey,
            patternSpecPropertyTypeIsOptioned,
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

        const className: string = invalid ?
            PatternSpecControlStates.INVALID :
            unsubmitted ? PatternSpecControlStates.UNSUBMITTED : PatternSpecControlStates.VALID_AND_SUBMITTED
        const controlProps: ControlProps = { onBlur, onChange, onKeyPress, patternSpecKey, patternSpecValue, className }
        let control: JSX.Element
        if (patternSpecPropertyTypeIsOptioned) {
            // tslint:disable-next-line:no-unsafe-any
            submittedPatternSpecValue = JSON.parse(submittedPatternSpecValue)
                .replace(/"/g, '')
            control = <OptionedPatternSpecControl {...{ ...controlProps, options: constraint as OptionedConstraint }}/>
        }
        else {
            control = <RangedPatternSpecControl {...controlProps}/>
        }

        return (
            <div {...{ className: 'pattern-spec-control' }}>
                <span {...{
                    className: SecretSelectorsForTest.SECRET_SUBMITTED_PATTERN_SPEC_CONTROL,
                    id: patternSpecKey,
                }}>{submittedPatternSpecValue}</span>
                <div>{formattedName || presentPatternSpecKey(patternSpecKey)}</div>
                {control}
                <button {...{ onClick, disabled, value: patternSpecValue, id: patternSpecKey }}>submit</button>
            </div>
        )
    }

export default PatternSpecControl
