// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { Title } from '../../../metadata'
import { SpecPanel } from '../../../spec'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { getOpenClassName } from './helpers'
import './styles'
import { SecondRowProps } from './types'

const mapStateToProps: (state: ImmutableState) => SecondRowProps =
    (state: ImmutableState): SecondRowProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            pageName: pageState.get(PageStateKey.PAGE_NAME),
            patternId: pageState.get(PageStateKey.PATTERN_ID),
        }
    }

const SecondRow: React.ComponentType<SecondRowProps> =
    ({ patternId, pageName }: SecondRowProps): React.ReactElement | null => (
        <div {...{ className: `row ${getOpenClassName({ patternId, pageName })}`, id: 'second-row' }} >
            <div {...{ className: 'middle' }} >
                <Title/>
            </div>
            <div {...{ className: 'right' }} >
                <SpecPanel/>
            </div>
        </div>
    )

export default connect(mapStateToProps)(SecondRow)
