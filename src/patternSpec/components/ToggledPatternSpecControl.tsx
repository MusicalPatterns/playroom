import * as React from 'react'
import { ToggledControlProps } from './types'

const ToggledPatternSpecControl: (toggledControlProps: ToggledControlProps) => JSX.Element =
    (toggledControlProps: ToggledControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            patternSpecKey,
            patternSpecValue,
            className,
        } = toggledControlProps

        return (
            <input {...{
                checked: patternSpecValue,
                className,
                id: patternSpecKey,
                onBlur,
                onChange,
                onKeyPress,
                type: 'checkbox',
            }}/>
        )
    }

export default ToggledPatternSpecControl
