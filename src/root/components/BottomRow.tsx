import * as React from 'react'
import { FirstRowProps } from './types'

const BottomRow: (props: FirstRowProps) => JSX.Element =
    ({ id }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: `left${id ? '' : ' closed'}` }} />
            <div {...{ className: `right${id ? '' : ' closed'}` }} />
        </div>
    )

export default BottomRow
