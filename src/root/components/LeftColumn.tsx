import * as React from 'react'
import { connect } from 'react-redux'
import { PatternPanel, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import { LeftColumnProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => LeftColumnProps =
    (state: ImmutableRootState): LeftColumnProps => ({
        leftColumnOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.LEFT_COLUMN_OPEN),
    })

const LeftColumn: React.ComponentType<LeftColumnProps> =
    ({ leftColumnOpen }: LeftColumnProps): JSX.Element => (
        <div {...{ id: 'left-column', className: leftColumnOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(LeftColumn)
