// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './styles'
import { ToggledInputsProps } from './types'

const ToggledInputs: React.ComponentType<ToggledInputsProps> =
    ({ onChange, fieldId, value: checked, fieldValidityClassName }: ToggledInputsProps): JSX.Element =>
        <div {...{ className: 'inputs toggled-inputs' }}>
            <input {...{
                checked,
                className: fieldValidityClassName,
                id: fieldId,
                onChange,
                type: 'checkbox',
            }}/>
            <FontAwesomeIcon {...{ icon: checked ? faCheckSquare : faSquare }}/>
        </div>

export default ToggledInputs
