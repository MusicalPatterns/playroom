import * as React from 'react'
import { PerformerPanel } from '../../performer'
import { FirstRowProps } from './types'

const FirstRow: (props: FirstRowProps) => JSX.Element =
    ({ id, pageName }: FirstRowProps): JSX.Element => (
        <div {...{ className: `row ${!pageName ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: 'left' }} >
                <PerformerPanel {...{ disabled: !id, pageName }}/>
            </div>
            <div {...{ className: 'right' }} />
        </div>
    )

export default FirstRow
