// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { PresetSelect } from '../presetSelect'
import { ResetSpecButton } from '../resetSpecButton'
import { SpecControls } from '../specControls'
import { SpecPanelOpenParameter } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => SpecPanelOpenParameter =
    (state: ImmutableState): SpecPanelOpenParameter => ({
        specPanelOpen: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const SpecPanelBody: React.ComponentType<SpecPanelOpenParameter> =
    ({ specPanelOpen }: SpecPanelOpenParameter): JSX.Element =>
        <div {...{ id: 'spec-panel-body', className: specPanelOpen ? 'open' : 'closed' }}>
            <PresetSelect/>
            <hr/>
            <SpecControls/>
            <hr/>
            <ResetSpecButton/>
        </div>

export default connect(mapStateToProps)(SpecPanelBody)
