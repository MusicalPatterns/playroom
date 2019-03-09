// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { StringedInputsProps } from './types'

const StringedInput: React.ComponentType<StringedInputsProps> =
    ({ onChange, id, value, fieldValidityClassName, minLength, maxLength }: StringedInputsProps): JSX.Element =>
        <input {...{ className: fieldValidityClassName, id, maxLength, minLength, onChange, type: 'text', value }}/>

export default StringedInput
