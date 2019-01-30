import * as React from 'react'
import { InvalidMessageProps } from './types'

const InvalidMessage: (props: InvalidMessageProps) => JSX.Element =
    ({ invalidMessage }: InvalidMessageProps): JSX.Element =>
        <div {...{ className: 'invalid-message' }}>{invalidMessage}</div>

export default InvalidMessage
