import * as React from 'react'
import { PerformerPanel } from '../../performer'
import { FirstRowProps } from './types'

const FirstRow: (props: FirstRowProps) => JSX.Element =
    ({ id }: FirstRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'first-row' }}>
            <div {...{ className: `left${id ? '' : ' closed'}` }} >
                <PerformerPanel {...{ disabled: !id }}/>
            </div>
            <div {...{ className: `right${id ? '' : ' closed'}` }} />
        </div>
    )

export default FirstRow
