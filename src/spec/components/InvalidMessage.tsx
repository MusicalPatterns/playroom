import * as React from 'react'
import { InvalidMessageProps } from './types'

const InvalidMessage: React.ComponentType<InvalidMessageProps> =
    ({ invalidMessage }: InvalidMessageProps): JSX.Element =>
        <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>

export default InvalidMessage
