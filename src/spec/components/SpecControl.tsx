import { Spec, SpecPropertyType } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { DomValue, SecretSelectorsForTest } from '../../types'
import {
    buildSpecControlEventAttacher,
    SpecControlEventAttacher,
    SpecEventParameters,
} from '../events'
import { SpecStateKeys } from '../state'
import { InvalidSpecMessages, SpecControlBooleanStates } from '../types'
import { buildControl } from './buildControl'
import { presentSpecKey, stringifyIfNecessary } from './helpers'
import { ControlProps, SpecControlProps, SpecControlStates } from './types'

const SpecControl: (specControlProps: SpecControlProps) => JSX.Element =
    (specControlProps: SpecControlProps): JSX.Element => {
        const { specKey, specControlsProps, specPropertyAttributes } = specControlProps
        const {
            handleSpecChange,
            handleSpecKeyboardSubmit,
            handleSpecButtonSubmit,
            handleSpecBlur,
            specState,
        } = specControlsProps
        const { specPropertyType: propertyType, constraint, formattedName } = specPropertyAttributes

        const displayedSpec: Spec =
            specState.get(SpecStateKeys.DISPLAYED_SPEC)
        const invalidSpecMessages: InvalidSpecMessages =
            specState.get(SpecStateKeys.INVALID_SPEC_MESSAGES)
        const disabledSpecButtons: SpecControlBooleanStates =
            specState.get(SpecStateKeys.DISABLED_SPEC_BUTTONS)
        const unsubmittedSpecControls: SpecControlBooleanStates =
            specState.get(SpecStateKeys.UNSUBMITTED_SPEC_CONTROLS)
        const submittedSpec: Spec =
            specState.get(SpecStateKeys.SUBMITTED_SPEC)

        const specValue: DomValue = displayedSpec[ specKey ] as DomValue
        const invalidMessage: Maybe<string> = invalidSpecMessages[ specKey ]
        const unsubmitted: boolean = !!unsubmittedSpecControls[ specKey ]
        const disabled: boolean = !!disabledSpecButtons[ specKey ]
        const submittedSpecValue: DomValue = submittedSpec[ specKey ] as DomValue

        const specEventParameters: SpecEventParameters = {
            isToggle: propertyType === SpecPropertyType.TOGGLED,
            specKey,
            specState,
        }

        const onChange: SpecControlEventAttacher = buildSpecControlEventAttacher({
            specEventExtractor: handleSpecChange,
            specEventParameters,
        })
        const onKeyPress: SpecControlEventAttacher = buildSpecControlEventAttacher({
            specEventExtractor: handleSpecKeyboardSubmit,
            specEventParameters,
        })
        const onClick: SpecControlEventAttacher = buildSpecControlEventAttacher({
            specEventExtractor: handleSpecButtonSubmit,
            specEventParameters,
        })
        const onBlur: SpecControlEventAttacher = buildSpecControlEventAttacher({
            specEventExtractor: handleSpecBlur,
            specEventParameters,
        })

        const className: string = !!invalidMessage ?
            SpecControlStates.INVALID :
            unsubmitted ? SpecControlStates.UNSUBMITTED : SpecControlStates.VALID_AND_SUBMITTED
        const controlProps: ControlProps = { className, onBlur, onChange, onKeyPress, specKey, specValue }
        const control: JSX.Element[] = buildControl({ propertyType, controlProps, constraint })

        const secretClassName: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'pattern-spec-control', id: specKey }}>
                <span {...{ className: secretClassName }}>{stringifyIfNecessary(submittedSpecValue)}</span>
                <div>{formattedName || presentSpecKey(specKey)}</div>
                {control}
                <button {...{
                    checked: specValue,
                    disabled,
                    id: specKey,
                    onClick,
                    value: specValue,
                }}>submit
                </button>
                {invalidMessage && <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>}
            </div>
        )
    }

export default SpecControl
