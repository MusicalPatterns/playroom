import * as React from 'react'
import { RangedInputProps } from './types'

const RangedSpecControlRangeInput: React.ComponentType<RangedInputProps> =
    ({ onChange, id, specValue, validityClass, min, max, step }: RangedInputProps): JSX.Element => (
        <input {...{
            className: `ranged-spec-control-range-input ${validityClass}`,
            id,
            max,
            min,
            onChange,
            step,
            type: 'range',
            value: specValue,
        }}/>
    )

export default RangedSpecControlRangeInput
