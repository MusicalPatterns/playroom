import * as React from 'react'
import { connect } from 'react-redux'
import { PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { MainPanelProps, MainPanelPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => MainPanelPropsFromState =
    (state: ImmutableRootState): MainPanelPropsFromState => ({
        rightPanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.RIGHT_PANEL_OPEN),
    })

const MainPanel: (props: MainPanelProps) => JSX.Element =
    ({ id, pageName, patterns, rightPanelOpen }: MainPanelProps): JSX.Element => (
        <div {...{ id: 'main-panel', className: rightPanelOpen ? 'right-panel-open' : 'right-panel-closed' }}>
            <FirstRow {...{ id, pageName }} />
            <SecondRow {...{ id, pageName, patterns }}/>
            {id && <Post {...{ id, patterns }}/>}
            {pageName && <Page {...{ pageName }}/>}
            <BottomRow />
        </div>
    )

export default connect(mapStateToProps)(MainPanel)
