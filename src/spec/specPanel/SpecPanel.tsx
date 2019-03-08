// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { SpecPanelBody } from '../specPanelBody'
import { SpecPanelHeader } from '../specPanelHeader'
import { SpecPanelOpenAsProp, SpecStateKey } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenAsProp =
    (state: ImmutableState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(StateKey.SPEC)
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
