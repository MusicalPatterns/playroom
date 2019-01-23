import { SpecPropertyType } from '@musical-patterns/pattern'
import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { EventHandler, SecretSelectorsForTest } from '../../types'
import { SpecChangeEventParameters } from '../events'
import { specControlId, stringifyIfNecessary, validityClassName } from './helpers'
import { buildInputElements, InputProps } from './input'
import { SpecControlProps } from './types'

const SpecControl: (specControlProps: SpecControlProps) => JSX.Element =
    // tslint:disable-next-line:cyclomatic-complexity
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
        const { description, specPropertyType, formattedName, units } = specPropertyAttributes

        const specChangeEventParameters: SpecChangeEventParameters = {
            arrayedPropertyIndex,
            isToggle: specPropertyType === SpecPropertyType.TOGGLED,
            specKey,
            specState,
        }
        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChange({ ...specChangeEventParameters, event })
        }

        const isNotAnArrayedProperty: boolean = arrayedPropertyIndex === undefined
        const id: string = specControlId({ isNotAnArrayedProperty, arrayedPropertyIndex, specKey })

        const className: string = validityClassName(invalidMessage)
        const inputProps: InputProps = { className, onChange, id, specValue }
        const inputElements: JSX.Element[] = buildInputElements({ specPropertyAttributes, inputProps })

        const secretClassName: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'spec-control', id }}>
                <span {...{ className: secretClassName }}>{stringifyIfNecessary(secretSubmittedSpecValue)}</span>
                {isNotAnArrayedProperty && <div>{formattedName || camelCaseToLowerCase(specKey)}</div>}
                {inputElements}
                {units && <div {...{ className: 'units' }}>{units}</div>}
                {description && <div {...{ className: 'description' }}>{description}</div>}
                {invalidMessage && <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>}
            </div>
        )
    }

export default SpecControl
