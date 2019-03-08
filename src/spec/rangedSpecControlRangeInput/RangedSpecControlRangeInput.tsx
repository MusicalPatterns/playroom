// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { RangedInputProps } from '../types'
import './styles'

const RangedSpecControlRangeInput: React.ComponentType<RangedInputProps> =
    ({ onChange, id, value, validityClass, min, max, step }: RangedInputProps): JSX.Element => (
        <input {...{
            className: `ranged-spec-control-range-input ${validityClass}`,
            id,
            max,
            min,
            onChange,
            step,
            type: 'range',
            value,
        }}/>
    )

export default RangedSpecControlRangeInput
