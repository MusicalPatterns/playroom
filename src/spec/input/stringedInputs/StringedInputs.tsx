// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { StringedConstraint } from '@musical-patterns/pattern'
import * as React from 'react'
import { StringedInputsProps } from './types'

const StringedInputs: React.ComponentType<StringedInputsProps> =
    (stringedInputsProps: StringedInputsProps): React.ReactElement | null => {
        const { fieldValidityClassName, fieldId, onChange, value, property, attributes } = stringedInputsProps
        const { constraint } = attributes[ property ]
        const { minLength, maxLength } = constraint as StringedConstraint

        return (
            <div {...{ className: 'inputs stringed-inputs' }}>
                <input
                    {...{
                        className: fieldValidityClassName,
                        id: fieldId,
                        maxLength,
                        minLength,
                        onChange,
                        type: 'text',
                        value,
                    }}
                />
            </div>
        )
    }

export default StringedInputs
