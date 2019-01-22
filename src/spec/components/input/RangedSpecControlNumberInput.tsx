import * as React from 'react'
import { RangedInputProps } from './types'

const RangedSpecControlNumberInput: (rangedInputProps: RangedInputProps) => JSX.Element =
    ({ onChange, id, specValue, className }: RangedInputProps): JSX.Element =>
        <input {...{ className, id, onChange, type: 'number', value: specValue }}/>

export default RangedSpecControlNumberInput
