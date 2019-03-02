import * as React from 'react'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import PageComponent from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { PropsFromAppBeforeSelectingPattern } from './types'

const MainPanel: (props: PropsFromAppBeforeSelectingPattern) => JSX.Element =
    ({ id, page, patterns }: PropsFromAppBeforeSelectingPattern): JSX.Element => (
        <div {...{ id: 'main-panel' }}>
            <FirstRow {...{ id, page }} />
            <SecondRow {...{ id, page, patterns }}/>
            {id && <Post {...{ id, patterns }}/>}
            {page && <PageComponent {...{ page }}/>}
            <BottomRow {...{ id }} />
        </div>
    )

export default MainPanel
