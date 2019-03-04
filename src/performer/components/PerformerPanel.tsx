import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../page'
import { ImmutableRootState, RootStateKey } from '../../root'
import NoPatternMessage from './NoPatternMessage'
import Performer from './Performer'
import { PerformerPanelProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PerformerPanelProps =
    (state: ImmutableRootState): PerformerPanelProps => ({
        pageName: state.get(RootStateKey.PAGE)
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
