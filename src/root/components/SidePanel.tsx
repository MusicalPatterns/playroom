import * as React from 'react'
import { connect } from 'react-redux'
import { PatternPanel, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import { SidePanelProps, SidePanelPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => SidePanelPropsFromState =
    (state: ImmutableRootState): SidePanelPropsFromState => ({
        sidePanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.SIDE_PANEL_OPEN),
    })

const SidePanel: (props: SidePanelProps) => JSX.Element =
    ({ sidePanelOpen, id, patterns, rightPanelOpen }: SidePanelProps): JSX.Element => (
        <div {...{ id: 'side-panel', className: sidePanelOpen ? 'open' : 'closed' }}>
            <PatternPanel {...{ id, patterns, rightPanelOpen }}/>
        </div>
    )

export default connect(mapStateToProps)(SidePanel)
