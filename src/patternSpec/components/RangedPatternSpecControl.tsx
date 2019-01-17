import * as React from 'react'
import { RangedControlProps } from './types'

const RangedPatternSpecControl: (rangedControlProps: RangedControlProps) => JSX.Element =
    (rangedControlProps: RangedControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            patternSpecKey,
            patternSpecValue,
            className,
        } = rangedControlProps

        return (
            <input {...{
                className,
                id: patternSpecKey,
                onBlur,
                onChange,
                onKeyPress,
                type: 'number',
                value: patternSpecValue,
            }}/>
        )
    }

export default RangedPatternSpecControl
