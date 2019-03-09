// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { RangedInputType, RangedPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { calculateMinAndMax, calculateStep } from './helpers'
import './styles'
import { RangedInputsProps } from './types'

const RangedInputs: React.ComponentType<RangedInputsProps> =
    ({ property, attributes, fieldValidityClassName, fieldId, onChange, value }: RangedInputsProps): JSX.Element => {
        const { constraint, hideInput } = attributes[ property ] as RangedPropertyAttributes
        const { min, max } = calculateMinAndMax(constraint)
        const step: number = calculateStep(constraint)

        return (
            <div {...{ className: 'inputs ranged-inputs' }}>
                {hideInput !== RangedInputType.NUMBER && <input {...{
                    className: fieldValidityClassName,
                    id: fieldId,
                    max,
                    min,
                    onChange,
                    step,
                    type: 'number',
                    value,
                }}/>}
                {hideInput !== RangedInputType.RANGE && <input {...{
                    className: fieldValidityClassName,
                    id: fieldId,
                    max,
                    min,
                    onChange,
                    step,
                    type: 'range',
                    value,
                }}/>}
            </div>
        )
    }

export default RangedInputs
