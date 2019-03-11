// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { Field } from '../../field'
import { ControlParentProps } from '../types'
import { Units } from '../units'
import './styles'

const SingularSpecControl: React.ComponentType<ControlParentProps> =
    ({ property }: ControlParentProps): React.ReactElement | null => (
        <div {...{ id: property, className: 'spec-control singular-spec-control' }} >
            <Field {...{ property }}/>
            <Units {...{ property }}/>
        </div>
    )

export default SingularSpecControl
