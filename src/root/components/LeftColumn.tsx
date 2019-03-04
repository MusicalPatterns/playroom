import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey, PatternPanel } from '../../page'
import { ImmutableRootState, RootStateKey } from '../state'
import { LeftColumnProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => LeftColumnProps =
    (state: ImmutableRootState): LeftColumnProps => ({
        leftColumnOpen: state.get(RootStateKey.PAGE)
            .get(PageStateKey.LEFT_COLUMN_OPEN),
    })

const LeftColumn: React.ComponentType<LeftColumnProps> =
    ({ leftColumnOpen }: LeftColumnProps): JSX.Element => (
        <div {...{ id: 'left-column', className: leftColumnOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(LeftColumn)
