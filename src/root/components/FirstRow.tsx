import * as React from 'react'
import { Performer } from '../../performer'
import { FirstRowProps } from './types'

const FirstRow: (props: FirstRowProps) => JSX.Element =
    ({ id }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'first-row' }}>
            <div {...{ className: `left${id ? '' : ' closed'}` }} >
                <Performer {...{ disabled: !id }}/>
            </div>
            <div {...{ className: `right${id ? '' : ' closed'}` }} />
        </div>
    )

export default FirstRow
