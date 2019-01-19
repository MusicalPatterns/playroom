import { OptionedConstraintOption } from '@musical-patterns/pattern'
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
            constraint,
        } = optionedControlProps

        const optionElements: JSX.Element[] = constraint.map(
            (option: OptionedConstraintOption, key: number): JSX.Element =>
                <option {...{ key, value: option.key }}>{option.formattedName}</option>,
        )

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
