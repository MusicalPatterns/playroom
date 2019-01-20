import * as React from 'react'
import { PatternSpecComponent } from '../../patternSpec'
import PatternListener from './PatternListener'
import { SecondRowProps } from './types'

const SecondRow: (props: SecondRowProps) => JSX.Element =
    ({ patternId, patterns }: SecondRowProps): JSX.Element => (
        <div {...{ className: 'row', id: 'second-row' }} >
            <div {...{ className: 'left' }} >
                {patternId && <h1>{patterns[ patternId ].metadata.formattedName}</h1>}
            </div>
            <div {...{ className: `right${patternId ? '' : ' closed'}` }} >
                {patternId && <PatternSpecComponent/>}
                {patternId && <PatternListener {...{ patternId, patterns }}/>}
            </div>
        </div>
    )

export default SecondRow
