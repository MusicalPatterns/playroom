import * as React from 'react'
import NoPatternMessage from './NoPatternMessage'
import Performer from './Performer'
import { PerformerPanelProps } from './types'

const PerformerPanel: (props: PerformerPanelProps) => JSX.Element =
    ({ disabled, pageName }: PerformerPanelProps): JSX.Element => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <Performer {...{ disabled }} />
            <NoPatternMessage {...{ disabled }}/>
        </div>
    )

export default PerformerPanel
