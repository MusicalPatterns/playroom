import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { PatternStateKeys } from '../state'
import Hamburger from './Hamburger'
import PatternList from './PatternList'
import Title from './Title'
import { PatternsPanelProps, PatternsPanelPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternsPanelPropsFromState =
    (state: ImmutableRootState): PatternsPanelPropsFromState => ({
        patternsPanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.PATTERNS_PANEL_OPEN),
    })

const PatternPanel: (props: PatternsPanelProps) => JSX.Element =
    ({ patternsPanelOpen, patternId, patterns }: PatternsPanelProps): JSX.Element => (
        <div {...{ id: 'pattern-panel', className: patternsPanelOpen ? 'open' : 'closed' }}>
            <div {...{ id: 'pattern-panel-stuff' }}>
                <Hamburger {...{ patternsPanelOpen }}/>
                <PatternList {...{ patternId, patterns }}/>
                <Title/>
            </div>
        </div>
    )

export default connect(mapStateToProps)(PatternPanel)