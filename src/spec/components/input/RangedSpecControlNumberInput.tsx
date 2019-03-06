import * as React from 'react'
import { RangedInputProps } from './types'

const RangedSpecControlNumberInput: React.ComponentType<RangedInputProps> =
    ({ onChange, id, value, validityClass, min, max, step }: RangedInputProps): JSX.Element =>
        <input {...{ className: validityClass, id, onChange, type: 'number', value, max, min, step }}/>

export default RangedSpecControlNumberInput
