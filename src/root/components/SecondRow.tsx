import * as React from 'react'
import { PatternSpec } from '../../patternSpec'
import PatternListener from './PatternListener'
import { PropsFromApp } from './types'

const SecondRow: (props: PropsFromApp) => JSX.Element =
    ({ patternId, patterns }: PropsFromApp): JSX.Element => (
        <div {...{ className: 'row', id: 'second-row' }} >
            <div {...{ className: 'left' }} >
                <h1>{patterns[ patternId ].metadata.formattedName}</h1>
            </div>
            <div {...{ className: 'right' }} >
                <PatternSpec/>
                <PatternListener {...{ patternId, patterns }}/>
            </div>
        </div>
    )

export default SecondRow
