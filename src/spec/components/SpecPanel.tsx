import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SpecStateKeys } from '../state'
import SpecPanelBody from './SpecPanelBody'
import SpecPanelHeader from './SpecPanelHeader'
import { SpecPanelOpenAsProp } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPanelOpenAsProp =
    (state: ImmutableRootState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SPEC_PANEL_OPEN),
    })

const SpecPanel: React.ComponentType<SpecPanelOpenAsProp> =
    ({ specPanelOpen }: SpecPanelOpenAsProp): JSX.Element => (
        <div {...{ id: 'spec-panel', className: specPanelOpen ? 'open' : 'closed' }}>
            <SpecPanelHeader/>
            <SpecPanelBody/>
        </div>
    )

export default connect(mapStateToProps)(SpecPanel)
