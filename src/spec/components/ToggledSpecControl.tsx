import * as React from 'react'
import { ToggledControlProps } from './types'

const ToggledSpecControl: (toggledControlProps: ToggledControlProps) => JSX.Element =
    (toggledControlProps: ToggledControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            specKey,
            specValue,
            className,
        } = toggledControlProps

        return (
            <input {...{
                checked: specValue,
                className,
                id: specKey,
                onBlur,
                onChange,
                onKeyPress,
                type: 'checkbox',
            }}/>
        )
    }

export default ToggledSpecControl
