import * as React from 'react'
import { ToggledControlProps } from './types'

const ToggledSpecControl: (toggledControlProps: ToggledControlProps) => JSX.Element =
    ({ onChange, id, specValue, className }: ToggledControlProps): JSX.Element =>
        <input {...{ checked: specValue, className, id, onChange, type: 'checkbox' }}/>

export default ToggledSpecControl
