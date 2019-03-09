// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { BottomRow } from '../bottomRow'
import { FirstRow } from '../firstRow'
import { Page } from '../page'
import { Post } from '../post'
import { SecondRow } from '../secondRow'
import './styles'
import { MiddlePlusRightColumnProps } from './types'

const mapStateToProps: (state: ImmutableState) => MiddlePlusRightColumnProps =
    (state: ImmutableState): MiddlePlusRightColumnProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: pageState.get(PageStateKey.PATTERN_ID),
            pageName: pageState.get(PageStateKey.PAGE_NAME),
            rightColumnOpen: pageState.get(PageStateKey.RIGHT_COLUMN_OPEN),
        }
    }

const MiddlePlusRightColumn: React.ComponentType<MiddlePlusRightColumnProps> =
    ({ id, pageName, rightColumnOpen }: MiddlePlusRightColumnProps): JSX.Element =>
        <div {...{ id: 'middle-plus-right-column', className: `right-column-${rightColumnOpen ? 'open' : 'closed'}` }}>
            <FirstRow/>
            <SecondRow/>
            {id && <Post/>}
            {pageName && <Page/>}
            <BottomRow/>
        </div>

export default connect(mapStateToProps)(MiddlePlusRightColumn)
