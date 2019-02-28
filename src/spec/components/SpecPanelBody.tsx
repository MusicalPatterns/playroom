import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SpecStateKeys } from '../state'
import Presets from './Presets'
import Reset from './Reset'
import SpecControls from './SpecControls'
import { SpecPanelOpenAsProp } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecPanelOpenAsProp =
    (state: ImmutableRootState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SPEC_PANEL_OPEN),
    })

const SpecPanelBody: (props: SpecPanelOpenAsProp) => JSX.Element =
    ({ specPanelOpen }: SpecPanelOpenAsProp): JSX.Element => (
        <div {...{ id: 'spec-panel-body', className: specPanelOpen ? 'open' : 'closed' }}>
            <Presets/>
            <hr/>
            <SpecControls/>
            <hr/>
            <Reset/>
        </div>
    )

export default connect(mapStateToProps)(SpecPanelBody)
