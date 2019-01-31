import * as React from 'react'
import { RangedInputProps } from './types'

const RangedSpecControlNumberInput: (rangedInputProps: RangedInputProps) => JSX.Element =
    ({ onChange, id, specValue, validityClass }: RangedInputProps): JSX.Element =>
        <input {...{ className: validityClass, id, onChange, type: 'number', value: specValue }}/>

export default RangedSpecControlNumberInput
