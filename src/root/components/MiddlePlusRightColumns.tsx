import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, Page, PageStateKey, Post } from '../../page'
import { ImmutableRootState, RootStateKey } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import SecondRow from './SecondRow'
import { MiddlePlusRightColumnsProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => MiddlePlusRightColumnsProps =
    (state: ImmutableRootState): MiddlePlusRightColumnsProps => {
        const patternState: ImmutablePageState = state.get(RootStateKey.PAGE)

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
