// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { Field, FieldPropsFromParent } from '../../field'

const SingularSpecControl: React.ComponentType<FieldPropsFromParent> =
    (fieldProps: FieldPropsFromParent): React.ReactElement | null => (
        <div {...{ id: fieldProps.property, className: 'spec-control singular-spec-control' }} >
            <Field {...fieldProps}/>
        </div>
    )

export default SingularSpecControl
