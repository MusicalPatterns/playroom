import * as React from 'react'
import { connect } from 'react-redux'
import { LeftColumnStateKey } from '../../leftColumn'
import { PerformerPanel } from '../../middleColumn'
import { ImmutableRootState, RootStateKey } from '../state'
import { FirstRowProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => FirstRowProps =
    (state: ImmutableRootState): FirstRowProps => ({
        pageName: state.get(RootStateKey.LEFT_COLUMN)
            .get(LeftColumnStateKey.PAGE_NAME),
    })

const FirstRow: React.ComponentType<FirstRowProps> =
    ({ pageName }: FirstRowProps): JSX.Element => (
        <div {...{ className: `row ${!pageName ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: 'middle' }} >
                <PerformerPanel/>
            </div>
            <div {...{ className: 'right' }} />
        </div>
    )

export default connect(mapStateToProps)(FirstRow)
