// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { Field, FieldPropsFromParent } from '../../field'

const SingularSpecControl: React.ComponentType<FieldPropsFromParent> =
    (fieldProps: FieldPropsFromParent): JSX.Element =>
        <div {...{ className: 'singular-spec-control' }} >
            <Field {...fieldProps}/>
        </div>

export default SingularSpecControl
