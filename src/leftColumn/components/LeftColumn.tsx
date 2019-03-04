import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { LeftColumnStateKey } from '../state'
import PatternPanel from './PatternPanel'
import { LeftColumnProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => LeftColumnProps =
    (state: ImmutableRootState): LeftColumnProps => ({
        leftColumnOpen: state.get(RootStateKey.LEFT_COLUMN)
            .get(LeftColumnStateKey.LEFT_COLUMN_OPEN),
    })

const LeftColumn: React.ComponentType<LeftColumnProps> =
    ({ leftColumnOpen }: LeftColumnProps): JSX.Element => (
        <div {...{ id: 'left-column', className: leftColumnOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(LeftColumn)
