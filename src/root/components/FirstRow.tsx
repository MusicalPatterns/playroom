import * as React from 'react'
import { connect } from 'react-redux'
import { PatternStateKey } from '../../pattern'
import { PerformerPanel } from '../../performer'
import { ImmutableRootState, RootStateKey } from '../state'
import { FirstRowProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => FirstRowProps =
    (state: ImmutableRootState): FirstRowProps => ({
        pageName: state.get(RootStateKey.PATTERN)
            .get(PatternStateKey.PAGE_NAME),
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
