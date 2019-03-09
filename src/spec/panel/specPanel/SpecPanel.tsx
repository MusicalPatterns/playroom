// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { SpecPanelBody } from '../specPanelBody'
import { SpecPanelHeader } from '../specPanelHeader'
import { SpecPanelOpenParameter } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenParameter =
    (state: ImmutableState): SpecPanelOpenParameter => ({
        specPanelOpen: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const SpecPanel: React.ComponentType<SpecPanelOpenParameter> =
    ({ specPanelOpen }: SpecPanelOpenParameter): JSX.Element =>
        <div {...{ id: 'spec-panel', className: specPanelOpen ? 'open' : 'closed' }}>
            <SpecPanelHeader/>
            <SpecPanelBody/>
        </div>

export default connect(mapStateToProps)(SpecPanel)
