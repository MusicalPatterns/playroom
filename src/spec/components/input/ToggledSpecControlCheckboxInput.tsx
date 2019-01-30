import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { ToggledInputProps } from './types'

const ToggledSpecControlCheckboxInput: (toggledControlProps: ToggledInputProps) => JSX.Element =
    ({ onChange, id, specValue, className }: ToggledInputProps): JSX.Element => (
        <div {...{ className: 'toggled-spec-control-checkbox-input' }}>
            <input {...{ checked: specValue, className, id, onChange, type: 'checkbox' }}/>
            <FontAwesomeIcon {...{ key: 1, icon: specValue ? faCheckSquare : faSquare }}/>
        </div>
    )

export default ToggledSpecControlCheckboxInput
