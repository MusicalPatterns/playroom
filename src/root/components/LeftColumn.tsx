import * as React from 'react'
import { connect } from 'react-redux'
import { PatternPanel, PatternStateKey } from '../../pattern'
import { ImmutableRootState, RootStateKey } from '../state'
import { LeftColumnProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => LeftColumnProps =
    (state: ImmutableRootState): LeftColumnProps => ({
        leftColumnOpen: state.get(RootStateKey.PATTERN)
            .get(PatternStateKey.LEFT_COLUMN_OPEN),
    })

const LeftColumn: React.ComponentType<LeftColumnProps> =
    ({ leftColumnOpen }: LeftColumnProps): JSX.Element => (
        <div {...{ id: 'left-column', className: leftColumnOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(LeftColumn)
