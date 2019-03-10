// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Post } from '../../../metadata'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { BottomRow } from '../bottomRow'
import { FirstRow } from '../firstRow'
import { Page } from '../page'
import { SecondRow } from '../secondRow'
import './styles'
import { MiddlePlusRightColumnProps } from './types'

const mapStateToProps: (state: ImmutableState) => MiddlePlusRightColumnProps =
    (state: ImmutableState): MiddlePlusRightColumnProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            pageName: pageState.get(PageStateKey.PAGE_NAME),
            patternId: pageState.get(PageStateKey.PATTERN_ID),
            rightColumnOpen: pageState.get(PageStateKey.RIGHT_COLUMN_OPEN),
        }
    }

const MiddlePlusRightColumn: React.ComponentType<MiddlePlusRightColumnProps> =
    ({ patternId, pageName, rightColumnOpen }: MiddlePlusRightColumnProps): React.ReactElement | null => (
        <div {...{ id: 'middle-plus-right-column', className: `right-column-${rightColumnOpen ? 'open' : 'closed'}` }}>
            <FirstRow/>
            <SecondRow/>
            {patternId && <Post/>}
            {pageName && <Page/>}
            <BottomRow/>
        </div>
    )

export default connect(mapStateToProps)(MiddlePlusRightColumn)
