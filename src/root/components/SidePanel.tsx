import * as React from 'react'
import { connect } from 'react-redux'
import { PatternPanel, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import { SidePanelProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => SidePanelProps =
    (state: ImmutableRootState): SidePanelProps => ({
        sidePanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.SIDE_PANEL_OPEN),
    })

const SidePanel: (props: SidePanelProps) => JSX.Element =
    ({ sidePanelOpen }: SidePanelProps): JSX.Element => (
        <div {...{ id: 'side-panel', className: sidePanelOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(SidePanel)
