// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { RangedInputType, RangedPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { computeMinAndMax, computeStep } from './helpers'
import './styles'
import { RangedInputProps, RangedInputsProps } from './types'

const RangedInputs: React.ComponentType<RangedInputsProps> =
    (rangedInputsProps: RangedInputsProps): React.ReactElement | null => {
        const { property, attributes, fieldValidityClassName, fieldId, onChange, value } = rangedInputsProps
        const { constraint, hideInput } = attributes[ property ] as RangedPropertyAttributes
        const { min, max } = computeMinAndMax(constraint)

        const rangedInputProps: RangedInputProps = {
            className: fieldValidityClassName,
            id: fieldId,
            max,
            min,
            onChange,
            step: computeStep(constraint),
            value,
        }

        return (
            <div {...{ className: 'inputs ranged-inputs' }}>
                {hideInput !== RangedInputType.NUMBER && <input {...{ ...rangedInputProps, type: 'number' }} />}
                {hideInput !== RangedInputType.RANGE && <input {...{ ...rangedInputProps, type: 'range' }} />}
            </div>
        )
    }

export default RangedInputs
