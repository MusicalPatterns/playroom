// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { SpecPanelBody } from '../specPanelBody'
import { SpecPanelHeader } from '../specPanelHeader'
import './styles'
import { SpecPanelProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecPanelProps =
    (state: ImmutableState): SpecPanelProps => ({
        patternId: state.get(StateKey.PAGE)
            .get(PageStateKey.PATTERN_ID),
        specPanelOpen: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_PANEL_OPEN),
    })

const SpecPanel: React.ComponentType<SpecPanelProps> =
    ({ patternId, specPanelOpen }: SpecPanelProps): React.ReactElement | null => {
        if (isUndefined(patternId)) {
            return null
        }

        return (
            <div {...{ id: 'spec-panel', className: specPanelOpen ? 'open' : 'closed' }}>
                <SpecPanelHeader/>
                <SpecPanelBody/>
            </div>
        )
    }

export default connect(mapStateToProps)(SpecPanel)
