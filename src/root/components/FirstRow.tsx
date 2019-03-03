import * as React from 'react'
import { connect } from 'react-redux'
import { PatternStateKeys } from '../../pattern'
import { PerformerPanel } from '../../performer'
import { ImmutableRootState, RootStateKeys } from '../state'
import { FirstRowProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => FirstRowProps =
    (state: ImmutableRootState): FirstRowProps => ({
        pageName: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.PAGE_NAME),
    })

const FirstRow: React.ComponentType<FirstRowProps> =
    ({ pageName }: FirstRowProps): JSX.Element => (
        <div {...{ className: `row ${!pageName ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: 'left' }} >
                <PerformerPanel/>
            </div>
            <div {...{ className: 'right' }} />
        </div>
    )

export default connect(mapStateToProps)(FirstRow)
