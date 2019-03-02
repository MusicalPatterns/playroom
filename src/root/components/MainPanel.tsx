import * as React from 'react'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { PropsFromAppBeforeSelectingPattern } from './types'

const MainPanel: (props: PropsFromAppBeforeSelectingPattern) => JSX.Element =
    ({ id, pageName, patterns }: PropsFromAppBeforeSelectingPattern): JSX.Element => (
        <div {...{ id: 'main-panel' }}>
            <FirstRow {...{ id, pageName }} />
            <SecondRow {...{ id, pageName, patterns }}/>
            {id && <Post {...{ id, patterns }}/>}
            {pageName && <Page {...{ pageName }}/>}
            <BottomRow {...{ id }} />
        </div>
    )

export default MainPanel
