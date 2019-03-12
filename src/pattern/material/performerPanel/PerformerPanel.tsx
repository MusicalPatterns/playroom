// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, StateKey } from '../../../types'
import { IdStateKey } from '../../id'
import { PatternStateKey } from '../../types'
import { RecompileListener } from '../recompileListener'
import { TimeControls } from '../timeControls'
import { ToggleImmersiveAudioButton } from '../toggleImmersiveAudioButton'
import './styles'
import { PerformerPanelProps } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerPanelProps =
    (state: ImmutableState): PerformerPanelProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
        patternId: state.get(StateKey.PATTERN)
            .get(PatternStateKey.ID)
            .get(IdStateKey.PATTERN_ID),
    })

const PerformerPanel: React.ComponentType<PerformerPanelProps> =
    ({ patternId, pageName }: PerformerPanelProps): React.ReactElement | null => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <TimeControls/>
            <ToggleImmersiveAudioButton/>
            <RecompileListener/>
        </div>
    )

export default connect(mapStateToProps)(PerformerPanel)
