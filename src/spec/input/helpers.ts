import { DomValue, SingularValidationResult } from '@musical-patterns/pattern'
import * as React from 'react'
import { EventHandler } from '../../types'
import { computeFieldId, computeFieldValidityClassName } from '../field'
import { computeSingularDisplayedValue, computeSingularValidationResult } from '../singularValues'
import { InputsProps, InputStuff } from './types'

const computeInputStuff: (inputsProps: InputsProps) => InputStuff =
    (inputsProps: InputsProps): InputStuff => {
        const {
            attributes,
            displayedSpec,
            handleFieldChangeEvent,
            property,
            fieldIndex,
            validationResults,
            submittedSpec,
            validationFunction,
        } = inputsProps
        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldChangeEvent({
                attributes,
                displayedSpec,
                event,
                fieldIndex,
                property,
                submittedSpec,
                validationFunction,
            })
        }
        const singularValidationResult: SingularValidationResult = computeSingularValidationResult({
            fieldIndex,
            property,
            validationResults,
        })
        const fieldValidityClassName: string = computeFieldValidityClassName(singularValidationResult)
        const value: DomValue = computeSingularDisplayedValue({ displayedSpec, property, fieldIndex })
        const fieldId: string = computeFieldId({ property, fieldIndex })

        return {
            fieldId,
            fieldValidityClassName,
            onChange,
            value,
        }
    }

export {
    computeInputStuff,
}
