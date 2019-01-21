import { OptionedConstraintOption } from '@musical-patterns/pattern'
import * as React from 'react'
import { OptionedControlProps } from './types'

const OptionedSpecControl: (optionedControlProps: OptionedControlProps) => JSX.Element =
    ({ onChange, specKey, specValue, className, constraint }: OptionedControlProps): JSX.Element => {
        const optionElements: JSX.Element[] = constraint.map(
            (option: OptionedConstraintOption, key: number): JSX.Element =>
                <option {...{ key, value: option.key }}>{option.formattedName}</option>,
        )

        return (
            <select {...{ className, id: specKey, onChange, value: specValue }}>{optionElements}</select>
        )
    }

export default OptionedSpecControl
