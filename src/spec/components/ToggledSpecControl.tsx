import * as React from 'react'
import { ToggledControlProps } from './types'

const ToggledSpecControl: (toggledControlProps: ToggledControlProps) => JSX.Element =
    ({ onChange, specKey, specValue, className }: ToggledControlProps): JSX.Element =>
        <input {...{ checked: specValue, className, id: specKey, onChange, type: 'checkbox' }}/>

export default ToggledSpecControl
