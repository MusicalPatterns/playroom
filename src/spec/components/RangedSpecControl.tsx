import * as React from 'react'
import { RangedControlProps } from './types'

const RangedSpecControl: (rangedControlProps: RangedControlProps) => JSX.Element =
    ({ onChange, id, specValue, className }: RangedControlProps): JSX.Element =>
        <input {...{ className, id, onChange, type: 'number', value: specValue }}/>

export default RangedSpecControl
