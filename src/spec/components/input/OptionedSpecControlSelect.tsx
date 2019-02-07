import { OptionedConstraintOption } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, constantCaseToUpperCase, negative } from '@musical-patterns/utilities'
import * as React from 'react'
import { OptionedInputProps } from './types'

const OptionedSpecControlSelect: (optionedInputProps: OptionedInputProps) => JSX.Element =
    ({ onChange, id, specValue, validityClass, constraint }: OptionedInputProps): JSX.Element => {
        const optionElements: JSX.Element[] = constraint
            .sort((option: OptionedConstraintOption, nextOption: OptionedConstraintOption): number => {
                const order: number = option.order === undefined ? ARBITRARILY_LARGE_NUMBER : option.order
                const nextOrder: number = nextOption.order === undefined ? ARBITRARILY_LARGE_NUMBER : nextOption.order

                return order < nextOrder ? negative(1) : 1
            })
            .map((option: OptionedConstraintOption, index: number): JSX.Element => {
                const { key, description, formattedName } = option

                return (
                    <option {...{ key: index, value: key, title: description }}>
                        {formattedName || constantCaseToUpperCase(key)}
                    </option>
                )
            })

        return (
            <select {...{ className: validityClass, id, onChange, value: specValue }}>{optionElements}</select>
        )
    }

export default OptionedSpecControlSelect
