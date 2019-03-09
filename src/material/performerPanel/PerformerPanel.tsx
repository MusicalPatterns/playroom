// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, PageStateKey } from '../../page'
import { ImmutableState, StateKey } from '../../types'
import { RecompileListener } from '../recompileListener'
import { TimeControls } from '../timeControls'
import { ToggleImmersiveAudioButton } from '../toggleImmersiveAudioButton'
import './styles'
import { PerformerPanelProps } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerPanelProps =
    (state: ImmutableState): PerformerPanelProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: pageState
                .get(PageStateKey.PATTERN_ID),
            pageName: pageState
                .get(PageStateKey.PAGE_NAME),
        }
    }

const PerformerPanel: React.ComponentType<PerformerPanelProps> =
    ({ id, pageName }: PerformerPanelProps): JSX.Element => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <TimeControls/>
            <ToggleImmersiveAudioButton/>
            {id && <RecompileListener/>}
        </div>
    )

export default connect(mapStateToProps)(PerformerPanel)
