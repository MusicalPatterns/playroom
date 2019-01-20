import * as React from 'react'
import { RangedControlProps } from './types'

const RangedSpecControl: (rangedControlProps: RangedControlProps) => JSX.Element =
    (rangedControlProps: RangedControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            specKey,
            specValue,
            className,
        } = rangedControlProps

        return (
            <input {...{
                className,
                id: specKey,
                onBlur,
                onChange,
                onKeyPress,
                type: 'number',
                value: specValue,
            }}/>
        )
    }

export default RangedSpecControl
