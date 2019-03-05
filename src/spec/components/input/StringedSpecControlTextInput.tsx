import * as React from 'react'
import { StringedInputProps } from './types'

const StringedSpecControlTextInput: React.ComponentType<StringedInputProps> =
    ({ onChange, id, specValue, validityClass, minLength, maxLength }: StringedInputProps): JSX.Element =>
        <input {...{ className: validityClass, id, maxLength, minLength, onChange, type: 'text', value: specValue }}/>

export default StringedSpecControlTextInput
