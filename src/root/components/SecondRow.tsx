import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, PageStateKey, PatternTitle, SpecAndPatternListener } from '../../page'
import { SpecPanel } from '../../spec'
import { ImmutableRootState, RootStateKey } from '../state'
import { SecondRowProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => SecondRowProps =
    (state: ImmutableRootState): SecondRowProps => {
        const patternState: ImmutablePageState = state.get(RootStateKey.PAGE)

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
