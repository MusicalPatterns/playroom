// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { SpecPanel } from '../../../spec'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { PatternTitle } from '../patternTitle'
import { SpecAndPatternListener } from '../specAndPatternListener'
import './styles'
import { SecondRowProps } from './types'

const mapStateToProps: (state: ImmutableState) => SecondRowProps =
    (state: ImmutableState): SecondRowProps => {
        const patternState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: patternState.get(PageStateKey.PATTERN_ID),
            pageName: patternState.get(PageStateKey.PAGE_NAME),
        }
    }

const SecondRow: React.ComponentType<SecondRowProps> =
    ({ id, pageName }: SecondRowProps): JSX.Element => {
        if (pageName || !id) {
            return (
                <div {...{ className: 'row closed', id: 'second-row' }} >
                    <div {...{ className: 'middle' }} />
                    <div {...{ className: 'right' }} >
                    </div>
                </div>
            )
        }

        return (
            <div {...{ className: 'row open', id: 'second-row' }} >
                <div {...{ className: 'middle' }} >
                    <PatternTitle/>
                </div>
                <div {...{ className: 'right' }} >
                    <SpecPanel/>
                    <SpecAndPatternListener/>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(SecondRow)
