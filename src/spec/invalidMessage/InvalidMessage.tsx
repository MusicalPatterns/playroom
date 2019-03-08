// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import './styles'
import { InvalidMessageProps } from './types'

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    ({ invalidMessage }: InvalidMessageProps): JSX.Element =>
        <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>

export default InvalidMessage
