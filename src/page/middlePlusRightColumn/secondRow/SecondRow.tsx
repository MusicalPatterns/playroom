// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { SpecPanel } from '../../../spec'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { SpecAndPatternListener } from '../specAndPatternListener'
import { Title } from '../title'
import { getOpenClassName, getShowTitle } from './helpers'
import './styles'
import { SecondRowProps } from './types'

const mapStateToProps: (state: ImmutableState) => SecondRowProps =
    (state: ImmutableState): SecondRowProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: pageState.get(PageStateKey.PATTERN_ID),
            pageName: pageState.get(PageStateKey.PAGE_NAME),
        }
    }

const SecondRow: React.ComponentType<SecondRowProps> =
    ({ id, pageName }: SecondRowProps): JSX.Element => {
        const showTitle: boolean = getShowTitle({ id, pageName })
        const openClassName: string = getOpenClassName({ showTitle })

        return (
            <div {...{ className: `row ${openClassName}`, id: 'second-row' }} >
                <div {...{ className: 'middle' }} >
                    {showTitle && <Title/>}
                </div>
                <div {...{ className: 'right' }} >
                    {id && <SpecPanel/>}
                    {id && <SpecAndPatternListener/>}
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(SecondRow)
