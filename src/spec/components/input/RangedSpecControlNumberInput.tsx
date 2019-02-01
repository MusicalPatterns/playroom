import * as React from 'react'
import { RangedInputProps } from './types'

const RangedSpecControlNumberInput: (rangedInputProps: RangedInputProps) => JSX.Element =
    ({ onChange, id, specValue, validityClass, min, max, step }: RangedInputProps): JSX.Element =>
        <input {...{ className: validityClass, id, onChange, type: 'number', value: specValue, max, min, step }}/>

export default RangedSpecControlNumberInput
