import * as React from 'react'
import { FirstRowProps } from './types'

const BottomRow: (props: FirstRowProps) => JSX.Element =
    ({ patternId }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'bottom-row' }} >
            <div {...{ className: `left${patternId ? '' : ' closed'}` }} />
            <div {...{ className: `right${patternId ? '' : ' closed'}` }} />
        </div>
    )

export default BottomRow
