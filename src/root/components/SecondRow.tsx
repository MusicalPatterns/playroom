import * as React from 'react'
import { SpecComponent } from '../../spec'
import PatternListener from './PatternListener'
import { SecondRowProps } from './types'

const SecondRow: (props: SecondRowProps) => JSX.Element =
    ({ id, patterns }: SecondRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'second-row' }} >
            <div {...{ className: 'left' }} >
                {id && <h1>{patterns[ id ].metadata.formattedName}</h1>}
            </div>
            <div {...{ className: `right${id ? '' : ' closed'}` }} >
                {id && <SpecComponent/>}
                {id && <PatternListener {...{ id, patterns }}/>}
            </div>
        </div>
    )

export default SecondRow
