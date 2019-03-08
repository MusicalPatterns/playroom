// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, Page, PageStateKey, Post } from '../../page'
import { ImmutableState, StateKey } from '../../types'
import { BottomRow } from '../bottomRow'
import { FirstRow } from '../firstRow'
import { SecondRow } from '../secondRow'
import './styles'
import { MiddlePlusRightColumnsProps } from './types'

const mapStateToProps: (state: ImmutableState) => MiddlePlusRightColumnsProps =
    (state: ImmutableState): MiddlePlusRightColumnsProps => {
        const patternState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: patternState.get(PageStateKey.PATTERN_ID),
            pageName: patternState.get(PageStateKey.PAGE_NAME),
            rightColumnOpen: patternState.get(PageStateKey.RIGHT_COLUMN_OPEN),
        }
    }

const MiddlePlusRightColumns: React.ComponentType<MiddlePlusRightColumnsProps> =
    ({ id, pageName, rightColumnOpen }: MiddlePlusRightColumnsProps): JSX.Element => (
        <div {...{ id: 'middle-plus-right-columns', className: `right-column-${rightColumnOpen ? 'open' : 'closed'}` }}>
            <FirstRow/>
            <SecondRow/>
            {id && <Post/>}
            {pageName && <Page/>}
            <BottomRow/>
        </div>
    )

export default connect(mapStateToProps)(MiddlePlusRightColumns)
