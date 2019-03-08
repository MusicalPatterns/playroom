// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { PresetsSelect } from '../presetsSelect'
import { ResetButton } from '../resetButton'
import { SpecControls } from '../specControls'
import { SpecPanelOpenAsProp, SpecStateKey } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenAsProp =
    (state: ImmutableState): SpecPanelOpenAsProp => ({
        specPanelOpen: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const SpecPanelBody: React.ComponentType<SpecPanelOpenAsProp> =
    ({ specPanelOpen }: SpecPanelOpenAsProp): JSX.Element => (
        <div {...{ id: 'spec-panel-body', className: specPanelOpen ? 'open' : 'closed' }}>
            <PresetsSelect/>
            <hr/>
            <SpecControls/>
            <hr/>
            <ResetButton/>
        </div>
    )

export default connect(mapStateToProps)(SpecPanelBody)
