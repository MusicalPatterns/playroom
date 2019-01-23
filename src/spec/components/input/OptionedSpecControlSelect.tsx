import { OptionedConstraintOption } from '@musical-patterns/pattern'
import { ARBITRARILY_LARGE_NUMBER, constantCaseToUpperCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { OptionedInputProps } from './types'

const OptionedSpecControlSelect: (optionedInputProps: OptionedInputProps) => JSX.Element =
    ({ onChange, id, specValue, className, constraint }: OptionedInputProps): JSX.Element => {
        const optionElements: JSX.Element[] = constraint
            .sort((option: OptionedConstraintOption, nextOption: OptionedConstraintOption): number => {
                const order: number = option.order || ARBITRARILY_LARGE_NUMBER
                const nextOrder: number = nextOption.order || ARBITRARILY_LARGE_NUMBER

                return order < nextOrder ? -1 : 1
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
            <select {...{ className, id, onChange, value: specValue }}>{optionElements}</select>
        )
    }

export default OptionedSpecControlSelect
