import { OptionedConstraintOption } from '@musical-patterns/pattern'
import * as React from 'react'
import { OptionedControlProps } from './types'

const OptionedSpecControl: (optionedControlProps: OptionedControlProps) => JSX.Element =
    (optionedControlProps: OptionedControlProps): JSX.Element => {
        const {
            onBlur,
            onChange,
            onKeyPress,
            specKey,
            specValue,
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
                id: specKey,
                onBlur,
                onChange,
                onKeyPress,
                value: specValue,
            }}>{optionElements}</select>
        )
    }

export default OptionedSpecControl
