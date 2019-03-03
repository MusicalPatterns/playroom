import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { SpecStateKey } from '../state'
import SpecPanelBody from './SpecPanelBody'
import SpecPanelHeader from './SpecPanelHeader'
import { SpecPanelOpenAsProp } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPanelOpenAsProp =
    (state: ImmutableRootState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(RootStateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const SpecPanel: React.ComponentType<SpecPanelOpenAsProp> =
    ({ specPanelOpen }: SpecPanelOpenAsProp): JSX.Element => (
        <div {...{ id: 'spec-panel', className: specPanelOpen ? 'open' : 'closed' }}>
            <SpecPanelHeader/>
            <SpecPanelBody/>
        </div>
    )

export default connect(mapStateToProps)(SpecPanel)
