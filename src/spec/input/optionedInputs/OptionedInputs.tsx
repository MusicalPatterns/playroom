// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { OptionedConstraintOption, OptionedPropertyAttributes } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { sortOptions } from './sort'
import { OptionedInputsProps } from './types'

const OptionedInputs: React.ComponentType<OptionedInputsProps> =
    ({ attributes, fieldValidityClassName, fieldId, onChange, property, value }: OptionedInputsProps): JSX.Element => {
        const { constraint } = attributes[ property ] as OptionedPropertyAttributes

        const optionElements: JSX.Element[] = map(
            constraint.sort(sortOptions),
            ({ key, description, formattedName }: OptionedConstraintOption, index: Ordinal): JSX.Element =>
                <option {...{ key: from.Ordinal(index), value: key, title: description }}>
                    {formattedName || constantCaseToUpperCase(key)}
                </option>,
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
