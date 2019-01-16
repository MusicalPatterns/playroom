import * as React from 'react'
import { ControlProps } from './types'

const RangedPatternSpecControl: (rangedControlProps: ControlProps) => JSX.Element =
    (rangedControlProps: ControlProps): JSX.Element => {
        const { onBlur, onChange, onKeyPress, patternSpecKey, patternSpecValue, className } = rangedControlProps

        return (
            <input {...{
                className,
                id: patternSpecKey,
                onBlur,
                onChange,
                onKeyPress,
                value: patternSpecValue,
            }}/>
        )
    }

export default RangedPatternSpecControl
