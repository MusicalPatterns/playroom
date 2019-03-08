// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { RangedInputsProps } from '../types'

const RangedNumberInput: React.ComponentType<RangedInputsProps> =
    ({ onChange, id, value, validityClass, min, max, step }: RangedInputsProps): JSX.Element =>
        <input {...{ className: validityClass, id, onChange, type: 'number', value, max, min, step }}/>

export default RangedNumberInput
