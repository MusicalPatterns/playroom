import { DomSpecValue, SingularValidation } from '@musical-patterns/pattern'
import * as React from 'react'
import { EventHandler } from '../../../types'
import { computeFieldId, computeFieldValidityClassName } from '../field'
import { computeSingularDisplayedValue, computeSingularValidation } from '../singularValues'
import { SharedInputAttributes, SharedInputsProps } from './types'

const computeSharedInputAttributes: (sharedInputsProps: SharedInputsProps) => SharedInputAttributes =
    (
        {
            computeValidations,
            configurations,
            displayedSpecs,
            fieldIndex,
            handleFieldChangeEvent,
            restartOnModify,
            specKey,
            submittedSpecs,
            validations,
        }: SharedInputsProps,
    ): SharedInputAttributes => {
        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldChangeEvent({
                computeValidations,
                configurations,
                displayedSpecs,
                event,
                fieldIndex,
                restartOnModify,
                specKey,
                submittedSpecs,
            })
        }
        const singularValidation: SingularValidation = computeSingularValidation({
            fieldIndex,
            specKey,
            validations,
        })
        const fieldValidityClassName: string = computeFieldValidityClassName(singularValidation)
        const value: DomSpecValue = computeSingularDisplayedValue({ displayedSpecs, specKey, fieldIndex })
        const fieldId: string = computeFieldId({ specKey, fieldIndex })

        return {
            fieldId,
            fieldValidityClassName,
            onChange,
            value,
        }
    }

export {
    computeSharedInputAttributes,
}
