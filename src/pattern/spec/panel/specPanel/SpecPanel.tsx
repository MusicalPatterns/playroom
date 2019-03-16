// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { IdStateKey } from '../../../id'
import { ImmutablePatternState, PatternStateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { SpecPanelBody } from '../specPanelBody'
import { SpecPanelFooter } from '../specPanelFooter'
import { SpecPanelHeader } from '../specPanelHeader'
import './styles'
import { SpecPanelProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecPanelProps =
    (state: ImmutableState): SpecPanelProps => {
        const patternState: ImmutablePatternState = state.get(StateKey.PATTERN)

        return {
            patternId: patternState
                .get(PatternStateKey.ID)
                .get(IdStateKey.PATTERN_ID),
            specPanelOpen: patternState
                .get(PatternStateKey.SPEC)
                .get(SpecStateKey.SPEC_PANEL_OPEN),
        }
    }

const SpecPanel: React.ComponentType<SpecPanelProps> =
    ({ patternId, specPanelOpen }: SpecPanelProps): React.ReactElement | null => {
        if (isUndefined(patternId)) {
            return null
        }

        return (
            <div {...{ id: 'spec-panel', className: specPanelOpen ? 'open' : 'closed' }}>
                <SpecPanelHeader/>
                <SpecPanelBody/>
                <SpecPanelFooter/>
            </div>
        )
    }

export default connect(mapStateToProps)(SpecPanel)
