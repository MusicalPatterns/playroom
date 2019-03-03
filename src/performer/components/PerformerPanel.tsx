import * as React from 'react'
import { connect } from 'react-redux'
import { PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../../root'
import NoPatternMessage from './NoPatternMessage'
import Performer from './Performer'
import { PerformerPanelProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PerformerPanelProps =
    (state: ImmutableRootState): PerformerPanelProps => ({
        pageName: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.PAGE_NAME),
    })

const PerformerPanel: React.ComponentType<PerformerPanelProps> =
    ({ pageName }: PerformerPanelProps): JSX.Element => (
        <div {...{ id: 'performer-panel', className: !pageName ? 'open' : 'closed' }}>
            <Performer/>
            <NoPatternMessage/>
        </div>
    )

export default connect(mapStateToProps)(PerformerPanel)
