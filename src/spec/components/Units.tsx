import * as React from 'react'
import { UnitsProps } from './types'

const Units: React.ComponentType<UnitsProps> =
    ({ units }: UnitsProps): JSX.Element =>
        <div {...{ className: 'units' }}>{units}</div>

export default Units
