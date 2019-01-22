import * as React from 'react'
import { ToggledInputProps } from './types'

const ToggledSpecControlCheckboxInput: (toggledControlProps: ToggledInputProps) => JSX.Element =
    ({ onChange, id, specValue, className }: ToggledInputProps): JSX.Element =>
        <input {...{ checked: specValue, className, id, onChange, type: 'checkbox' }}/>

export default ToggledSpecControlCheckboxInput
