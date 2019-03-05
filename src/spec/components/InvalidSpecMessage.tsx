import * as React from 'react'
import { InvalidMessageProps } from './types'

const InvalidSpecMessage: React.ComponentType<InvalidMessageProps> =
    ({ invalidSpecMessage }: InvalidMessageProps): JSX.Element =>
        <div {...{ className: 'invalid-spec-message' }}>{invalidSpecMessage}</div>

export default InvalidSpecMessage
