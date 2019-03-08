// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import './styles'
import { InvalidMessageProps } from './types'

const InvalidSpecMessage: React.ComponentType<InvalidMessageProps> =
    ({ invalidSpecMessage }: InvalidMessageProps): JSX.Element =>
        <div {...{ className: 'invalid-spec-message' }}>{invalidSpecMessage}</div>

export default InvalidSpecMessage
