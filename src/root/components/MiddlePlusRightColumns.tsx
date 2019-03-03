import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Page from './Page'
import Post from './Post'
import SecondRow from './SecondRow'
import { MiddlePlusRightColumnsProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => MiddlePlusRightColumnsProps =
    (state: ImmutableRootState): MiddlePlusRightColumnsProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            pageName: patternState.get(PatternStateKeys.PAGE_NAME),
            rightColumnOpen: patternState.get(PatternStateKeys.RIGHT_COLUMN_OPEN),
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
