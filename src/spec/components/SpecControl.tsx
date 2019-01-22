import { SpecPropertyType } from '@musical-patterns/pattern'
import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { EventHandler, SecretSelectorsForTest } from '../../types'
import { SpecChangeEventParameters } from '../events'
import { specControlId, stringifyIfNecessary } from './helpers'
import { buildInputElements, InputProps } from './input'
import { SpecControlProps, SpecControlStates } from './types'

const SpecControl: (specControlProps: SpecControlProps) => JSX.Element =
    (specControlProps: SpecControlProps): JSX.Element => {
        const {
            arrayedPropertyIndex,
            invalidMessage,
            secretSubmittedSpecValue,
            specKey,
            specValue,
            specControlsProps,
            specPropertyAttributes,
        } = specControlProps
        const { handleSpecChange, specState } = specControlsProps
        const { specPropertyType: propertyType, constraint, formattedName } = specPropertyAttributes

        const specChangeEventParameters: SpecChangeEventParameters = {
            arrayedPropertyIndex,
            isToggle: propertyType === SpecPropertyType.TOGGLED,
            specKey,
            specState,
        }
        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChange({ ...specChangeEventParameters, event })
        }

        const isNotAnArrayedProperty: boolean = arrayedPropertyIndex === undefined
        const id: string = specControlId({ isNotAnArrayedProperty, arrayedPropertyIndex, specKey })

        const className: string = !!invalidMessage ? SpecControlStates.INVALID : SpecControlStates.VALID
        const inputProps: InputProps = { className, onChange, id, specValue }
        const inputElements: JSX.Element[] = buildInputElements({ propertyType, inputProps, constraint })

        const secretClassName: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'pattern-spec-control', id }}>
                <span {...{ className: secretClassName }}>{stringifyIfNecessary(secretSubmittedSpecValue)}</span>
                {isNotAnArrayedProperty && <div>{formattedName || camelCaseToLowerCase(specKey)}</div>}
                {inputElements}
                {invalidMessage && <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>}
            </div>
        )
    }

export default SpecControl
