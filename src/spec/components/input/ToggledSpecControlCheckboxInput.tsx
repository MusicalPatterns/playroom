import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { ToggledInputProps } from './types'

const ToggledSpecControlCheckboxInput: React.ComponentType<ToggledInputProps> =
    ({ onChange, id, value: checked, validityClass }: ToggledInputProps): JSX.Element => (
        <div {...{ className: 'toggled-spec-control-checkbox-input' }}>
            <input {...{ checked, className: validityClass, id, onChange, type: 'checkbox' }}/>
            <FontAwesomeIcon {...{ key: 1, icon: checked ? faCheckSquare : faSquare }}/>
        </div>
    )

export default ToggledSpecControlCheckboxInput
