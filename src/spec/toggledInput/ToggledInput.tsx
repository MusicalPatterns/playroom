// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import './styles'
import { ToggledInputsProps } from './types'

const ToggledInput: React.ComponentType<ToggledInputsProps> =
    ({ onChange, id, value: checked, validityClass }: ToggledInputsProps): JSX.Element => (
        <div {...{ className: 'toggled-spec-control-checkbox-input' }}>
            <input {...{ checked, className: validityClass, id, onChange, type: 'checkbox' }}/>
            <FontAwesomeIcon {...{ key: 1, icon: checked ? faCheckSquare : faSquare }}/>
        </div>
    )

export default ToggledInput
