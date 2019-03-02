import * as React from 'react'
import { FirstRowProps } from './types'

const BottomRow: (props: FirstRowProps) => JSX.Element =
    ({ id }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: `left ${id ? 'open' : 'closed'}` }} />
            <div {...{ className: `right ${id ? 'open' : 'closed'}` }} />
        </div>
    )

export default BottomRow
