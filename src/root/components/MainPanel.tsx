import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { MainPanelProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => MainPanelProps =
    (state: ImmutableRootState): MainPanelProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            pageName: patternState.get(PatternStateKeys.PAGE_NAME),
            rightPanelOpen: patternState.get(PatternStateKeys.RIGHT_PANEL_OPEN),
        }
    }

const MainPanel: (props: MainPanelProps) => JSX.Element =
    ({ id, pageName, rightPanelOpen }: MainPanelProps): JSX.Element => (
        <div {...{ id: 'main-panel', className: rightPanelOpen ? 'right-panel-open' : 'right-panel-closed' }}>
            <FirstRow/>
            <SecondRow/>
            {id && <Post/>}
            {pageName && <Page/>}
            <BottomRow/>
        </div>
    )

export default connect(mapStateToProps)(MainPanel)
