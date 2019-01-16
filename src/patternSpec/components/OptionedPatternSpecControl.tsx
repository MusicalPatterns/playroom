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
                // tslint:disable-next-line:no-unsafe-any
                value: JSON.parse(patternSpecValue),
            }}>{optionElements}</select>
        )
    }

export default OptionedPatternSpecControl
