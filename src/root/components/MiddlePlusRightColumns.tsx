import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableLeftColumnState, LeftColumnStateKey } from '../../leftColumn'
import { ImmutableRightColumnState, RightColumnStateKey } from '../../rightColumn'
import { ImmutableRootState, RootStateKey } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { MiddlePlusRightColumnsProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => MiddlePlusRightColumnsProps =
    (state: ImmutableRootState): MiddlePlusRightColumnsProps => {
        const leftColumnState: ImmutableLeftColumnState = state.get(RootStateKey.LEFT_COLUMN)
        const rightColumnState: ImmutableRightColumnState = state.get(RootStateKey.RIGHT_COLUMN)

        return {
            id: leftColumnState.get(LeftColumnStateKey.PATTERN_ID),
            pageName: leftColumnState.get(LeftColumnStateKey.PAGE_NAME),
            rightColumnOpen: rightColumnState.get(RightColumnStateKey.RIGHT_COLUMN_OPEN),
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
