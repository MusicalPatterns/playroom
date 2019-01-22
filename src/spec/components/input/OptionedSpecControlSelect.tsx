import { OptionedConstraintOption } from '@musical-patterns/pattern'
import * as React from 'react'
import { OptionedInputProps } from './types'

const OptionedSpecControlSelect: (optionedInputProps: OptionedInputProps) => JSX.Element =
    ({ onChange, id, specValue, className, constraint }: OptionedInputProps): JSX.Element => {
        const optionElements: JSX.Element[] = constraint.map(
            (option: OptionedConstraintOption, key: number): JSX.Element =>
                <option {...{ key, value: option.key }}>{option.formattedName}</option>,
        )

        return (
            <select {...{ className, id, onChange, value: specValue }}>{optionElements}</select>
        )
    }

export default OptionedSpecControlSelect
