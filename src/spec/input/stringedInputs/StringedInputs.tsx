// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { StringedInputsProps } from './types'

const StringedInputs: React.ComponentType<StringedInputsProps> =
    (stringedInputsProps: StringedInputsProps): React.ReactElement | null => {
        const { fieldValidityClassName, fieldId, onChange, value } = stringedInputsProps

        return (
            <div {...{ className: 'inputs stringed-inputs' }}>
                <input
                    {...{
                        className: fieldValidityClassName,
                        id: fieldId,
                        onChange,
                        type: 'text',
                        value,
                    }}
                />
            </div>
        )
    }

export default StringedInputs
