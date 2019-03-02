import * as React from 'react'
import { PerformerPanel } from '../../performer'
import { FirstRowProps } from './types'

const FirstRow: (props: FirstRowProps) => JSX.Element =
    ({ id, page }: FirstRowProps): JSX.Element => (
        <div {...{ className: `row ${!page ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: `left ${id ? 'open' : 'closed'}` }} >
                <PerformerPanel {...{ disabled: !id, page }}/>
            </div>
            <div {...{ className: `right ${id ? 'open' : 'closed'}` }} />
        </div>
    )

export default FirstRow
