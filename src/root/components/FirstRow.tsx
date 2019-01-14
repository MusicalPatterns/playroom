import * as React from 'react'
import { Performer } from '../../performer'
import { FirstRowProps } from './types'

const FirstRow: (props: FirstRowProps) => JSX.Element =
    ({ patternId }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'first-row' }}>
            <div {...{ className: `left${patternId ? '' : ' closed'}` }} >
                <Performer {...{ disabled: !patternId }}/>
            </div>
            <div {...{ className: `right${patternId ? '' : ' closed'}` }} />
        </div>
    )

export default FirstRow
