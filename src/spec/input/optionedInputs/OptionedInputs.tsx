// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { OptionedConstraintOption, OptionedPropertyAttributes } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { sortOptions } from './sort'
import { OptionedInputsProps } from './types'

const OptionedInputs: React.ComponentType<OptionedInputsProps> =
    (optionedInputsProps: OptionedInputsProps): React.ReactElement | null => {
        const { attributes, fieldValidityClassName, fieldId, onChange, property, value } = optionedInputsProps
        const { constraint } = attributes[ property ] as OptionedPropertyAttributes

        const optionElements: Array<React.ReactElement | null> = map(
            constraint.sort(sortOptions),
            (
                { value: optionValue, description, formattedName }: OptionedConstraintOption, index: Ordinal,
            ): React.ReactElement | null => (
                <option {...{ key: from.Ordinal(index), value: optionValue, title: description }}>
                    {formattedName || constantCaseToUpperCase(optionValue)}
                </option>
            ),
        )

        return (
            <div {...{ className: 'inputs optioned-inputs' }}>
                <select {...{ className: fieldValidityClassName, id: fieldId, onChange, value }}>
                    {optionElements}
                </select>
            </div>
        )
    }

export default OptionedInputs
