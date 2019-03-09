// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { SpecPanel } from '../../../spec'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { SpecAndPatternListener } from '../specAndPatternListener'
import { Title } from '../title'
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
        const stuffToShow: boolean = !isUndefined(pageName) || !isUndefined(id)

        return (
            <div {...{ className: `row ${stuffToShow ? 'open' : 'closed'}`, id: 'second-row' }} >
                <div {...{ className: 'middle' }} >
                    {stuffToShow && <Title/>}
                </div>
                {
                    id ?
                        <div {...{ className: 'right' }} >
                            <SpecPanel/>
                            <SpecAndPatternListener/>
                        </div> :
                        <div {...{ className: 'right' }} />
                }
            </div>
        )
    }

export default connect(mapStateToProps)(SecondRow)
