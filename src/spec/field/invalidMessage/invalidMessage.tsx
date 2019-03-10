// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import './styles'
import { InvalidMessageProps } from './types'

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    ({ singularValidationResult }: InvalidMessageProps): React.ReactElement | null =>
        singularValidationResult ? <div {...{ className: 'invalid-message' }}>{singularValidationResult}</div> : null

export default InvalidMessage
