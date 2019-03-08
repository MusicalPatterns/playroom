// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import './styles'
import { UnitsProps } from './types'

const Units: React.ComponentType<UnitsProps> =
    ({ units }: UnitsProps): JSX.Element =>
        <div {...{ className: 'units' }}>{units}</div>

export default Units
