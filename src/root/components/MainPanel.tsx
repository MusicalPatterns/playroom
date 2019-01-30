import * as React from 'react'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Post from './Post'
import SecondRow from './SecondRow'
import { PropsFromAppBeforeSelectingPattern } from './types'

const MainPanel: (props: PropsFromAppBeforeSelectingPattern) => JSX.Element =
    ({ id, patterns }: PropsFromAppBeforeSelectingPattern): JSX.Element => (
        <div {...{ id: 'main-panel' }}>
            <FirstRow {...{ id }} />
            <SecondRow {...{ id, patterns }}/>
            {id && <Post {...{ id, patterns }}/>}
            <BottomRow {...{ id }} />
        </div>
    )

export default MainPanel
