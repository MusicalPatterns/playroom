// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { RangedInputsProps } from '../types'
import './styles'

const RangedRangeInput: React.ComponentType<RangedInputsProps> =
    ({ onChange, id, value, fieldValidityClassName, min, max, step }: RangedInputsProps): JSX.Element => (
        <input {...{
            className: `ranged-spec-control-range-input ${fieldValidityClassName}`,
            id,
            max,
            min,
            onChange,
            step,
            type: 'range',
            value,
        }}/>
    )

export default RangedRangeInput
