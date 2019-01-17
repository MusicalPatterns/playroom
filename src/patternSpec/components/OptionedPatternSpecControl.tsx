import * as React from 'react'
import { OptionedControlProps } from './types'

const OptionedPatternSpecControl: (optionedControlProps: OptionedControlProps) => JSX.Element =
    (optionedControlProps: OptionedControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            patternSpecKey,
            patternSpecValue,
            className,
            options,
        } = optionedControlProps

        const optionElements: JSX.Element[] = options.map((option: string, key: number): JSX.Element =>
            <option {...{ key, value: option }}>{option}</option>)

        return (
            <select {...{
                className,
                id: patternSpecKey,
                onBlur,
                onChange,
                onKeyPress,
                value: patternSpecValue,
            }}>{optionElements}</select>
        )
    }

export default OptionedPatternSpecControl
