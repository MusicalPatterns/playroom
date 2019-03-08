// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PageStateKey } from '../../types'
import { PatternPanel } from '../patternPanel'
import './styles'
import { LeftColumnProps } from './types'

const mapStateToProps: (state: ImmutableState) => LeftColumnProps =
    (state: ImmutableState): LeftColumnProps => ({
        leftColumnOpen: state.get(StateKey.PAGE)
            .get(PageStateKey.LEFT_COLUMN_OPEN),
    })

const LeftColumn: React.ComponentType<LeftColumnProps> =
    ({ leftColumnOpen }: LeftColumnProps): JSX.Element => (
        <div {...{ id: 'left-column', className: leftColumnOpen ? 'open' : 'closed' }}>
            <PatternPanel/>
        </div>
    )

export default connect(mapStateToProps)(LeftColumn)
