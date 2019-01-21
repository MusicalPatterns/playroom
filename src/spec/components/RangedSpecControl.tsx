import * as React from 'react'
import { RangedControlProps } from './types'

const RangedSpecControl: (rangedControlProps: RangedControlProps) => JSX.Element =
    ({ onChange, specKey, specValue, className }: RangedControlProps): JSX.Element =>
        <input {...{ className, id: specKey, onChange, type: 'number', value: specValue }}/>

export default RangedSpecControl
