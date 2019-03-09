// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { PerformerPanel } from '../../../material'
import { ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import { NoPatternMessage } from '../noPatternMessage'
import './styles'
import { FirstRowProps } from './types'

const mapStateToProps: (state: ImmutableState) => FirstRowProps =
    (state: ImmutableState): FirstRowProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
    })

const FirstRow: React.ComponentType<FirstRowProps> =
    ({ pageName }: FirstRowProps): JSX.Element => (
        <div {...{ className: `row ${!pageName ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: 'middle' }} >
                <PerformerPanel/>
                <NoPatternMessage/>
            </div>
            <div {...{ className: 'right' }} />
        </div>
    )

export default connect(mapStateToProps)(FirstRow)
