import { camelCaseToLowerCase, isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { EventHandler, SecretSelectorsForTest } from '../../types'
import { SpecChangeEventParameters } from '../events'
import { getValidityClass, specControlId, stringifyIfNecessary } from './helpers'
import { Input, InputProps } from './input'
import InvalidSpecMessage from './InvalidSpecMessage'
import { SingularSpecControlProps } from './types'
import Units from './Units'

const SingularSpecControl: React.ComponentType<SingularSpecControlProps> =
    (specControlProps: SingularSpecControlProps): JSX.Element => {
        const {
            arrayedPropertyIndex,
            displayedSpecValue,
            invalidSpecMessage,
            submittedSpecValue,
            specKey,
            specControlsProps,
            specPropertyAttributes,
        } = specControlProps
        const { handleSpecChange, specState } = specControlsProps
        const { description, formattedName, units } = specPropertyAttributes

        const specChangeEventParameters: SpecChangeEventParameters = { arrayedPropertyIndex, specKey, specState }

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleSpecChange({ ...specChangeEventParameters, event })
        }

        const isNotAnArrayedProperty: boolean = isUndefined(arrayedPropertyIndex)
        const id: string = specControlId({ isNotAnArrayedProperty, arrayedPropertyIndex, specKey })

        const validityClass: string = getValidityClass(invalidSpecMessage)
        const inputProps: InputProps = { validityClass, onChange, id, value: displayedSpecValue }

        const secretClass: string = SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL

        return (
            <div {...{ className: 'singular-spec-control', id, title: description }}>
                <span {...{ className: secretClass }}>{stringifyIfNecessary(submittedSpecValue)}</span>
                {isNotAnArrayedProperty && <div>{formattedName || camelCaseToLowerCase(specKey)}</div>}
                <Input {...{ specPropertyAttributes, inputProps }}/>
                {units && <Units {...{ units }}/>}
                {invalidSpecMessage && <InvalidSpecMessage {...{ invalidSpecMessage }}/>}
            </div>
        )
    }

export default SingularSpecControl
