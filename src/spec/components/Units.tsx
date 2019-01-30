import * as React from 'react'
import { UnitsProps } from './types'

const Units: (props: UnitsProps) => JSX.Element =
    ({ units }: UnitsProps): JSX.Element =>
        <div {...{ className: 'units' }}>{units}</div>

export default Units
