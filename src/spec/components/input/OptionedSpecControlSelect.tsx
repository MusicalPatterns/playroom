import { OptionedConstraintOption } from '@musical-patterns/pattern'
import {
    ARBITRARILY_LARGE_NUMBER,
    constantCaseToUpperCase,
    from,
    map,
    negative,
    Ordinal,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { OptionedInputProps } from './types'

const OptionedSpecControlSelect: React.ComponentType<OptionedInputProps> =
    ({ onChange, id, value, validityClass, constraint }: OptionedInputProps): JSX.Element => {
        const optionElements: JSX.Element[] = map(
            constraint
                .sort((option: OptionedConstraintOption, nextOption: OptionedConstraintOption): number => {
                    const order: number = option.order === undefined ? ARBITRARILY_LARGE_NUMBER : option.order
                    const nextOrder: number = nextOption.order === undefined ?
                        ARBITRARILY_LARGE_NUMBER :
                        nextOption.order

                    return order < nextOrder ? negative(1) : 1
                }),
            (option: OptionedConstraintOption, index: Ordinal): JSX.Element => {
                const { key, description, formattedName } = option

                return (
                    <option {...{ key: from.Ordinal(index), value: key, title: description }}>
                        {formattedName || constantCaseToUpperCase(key)}
                    </option>
                )
            })

        return (
            <select {...{ className: validityClass, id, onChange, value }}>{optionElements}</select>
        )
    }

export default OptionedSpecControlSelect
