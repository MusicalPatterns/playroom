// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { NoPatternMessage, PerformerPanel } from '../../../pattern'
import { ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import './styles'
import { FirstRowProps } from './types'

const mapStateToProps: (state: ImmutableState) => FirstRowProps =
    (state: ImmutableState): FirstRowProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
    })

const FirstRow: React.ComponentType<FirstRowProps> =
    ({ pageName }: FirstRowProps): React.ReactElement | null => (
        <div {...{ className: `row ${!pageName ? 'open' : 'closed'}`, id: 'first-row' }}>
            <div {...{ className: 'middle' }} >
                <PerformerPanel/>
                <NoPatternMessage/>
            </div>
            <div {...{ className: 'right' }} />
        </div>
    )

export default connect(mapStateToProps)(FirstRow)
