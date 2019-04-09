import {
    computeSingularDisplayedValue,
    computeSingularValidation,
    DomSpecValue,
    SingularValidation,
} from '@musical-patterns/spec'
import * as React from 'react'
import { EventHandler } from '../../../types'
import { computeFieldId, computeFieldValidityClassName } from '../field'
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
            validation: validations && validations[ specKey ],
        })
        const fieldValidityClassName: string = computeFieldValidityClassName(singularValidation)
        const value: DomSpecValue = computeSingularDisplayedValue({
            domSpecValue: displayedSpecs[ specKey ],
            fieldIndex,
        })
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
