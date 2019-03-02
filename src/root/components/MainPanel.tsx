import * as React from 'react'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { PanelProps } from './types'

const MainPanel: (props: PanelProps) => JSX.Element =
    ({ id, pageName, patterns, rightPanelOpen }: PanelProps): JSX.Element => (
        <div {...{ id: 'main-panel', className: rightPanelOpen ? 'right-panel-open' : 'right-panel-closed' }}>
            <FirstRow {...{ id, pageName }} />
            <SecondRow {...{ id, pageName, patterns }}/>
            {id && <Post {...{ id, patterns }}/>}
            {pageName && <Page {...{ pageName }}/>}
            <BottomRow />
        </div>
    )

export default MainPanel
