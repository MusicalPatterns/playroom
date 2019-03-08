// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../page'
import { ImmutableState, StateKey } from '../../types'
import { NoPatternMessage } from '../noPatternMessage'
import { Performer } from '../performer'
import './styles'
import { PerformerPanelProps } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerPanelProps =
    (state: ImmutableState): PerformerPanelProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
    })

const PerformerPanel: React.ComponentType<PerformerPanelProps> =
    ({ pageName }: PerformerPanelProps): JSX.Element => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <Performer/>
            <NoPatternMessage/>
        </div>
    )

export default connect(mapStateToProps)(PerformerPanel)
