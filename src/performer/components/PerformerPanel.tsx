import * as React from 'react'
import NoPatternMessage from './NoPatternMessage'
import Performer from './Performer'
import { PerformerPanelProps } from './types'

const PerformerPanel: (props: PerformerPanelProps) => JSX.Element =
    ({ pageName }: PerformerPanelProps): JSX.Element => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <Performer/>
            <NoPatternMessage/>
        </div>
    )

export default PerformerPanel
