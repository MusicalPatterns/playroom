import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKeys } from '../../pattern'
import { SpecPanel } from '../../spec'
import { ImmutableRootState, RootStateKeys } from '../state'
import { getPatternTitle } from './helpers'
import PatternListener from './PatternListener'
import { SecondRowProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => SecondRowProps =
    (state: ImmutableRootState): SecondRowProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            pageName: patternState.get(PatternStateKeys.PAGE_NAME),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
        }
    }

const SecondRow: React.ComponentType<SecondRowProps> =
    ({ id, pageName, patterns }: SecondRowProps): JSX.Element => {
        if (pageName || !id) {
            return (
                <div {...{ className: 'row closed', id: 'second-row' }} >
                    <div {...{ className: 'left' }} />
                    <div {...{ className: 'right' }} >
                    </div>
                </div>
            )
        }

        const patternTitle: string = getPatternTitle({ patterns, id })

        return (
            <div {...{ className: 'row open', id: 'second-row' }} >
                <div {...{ className: 'left' }} >
                    <h1>{patternTitle}</h1>
                </div>
                <div {...{ className: 'right' }} >
                    <SpecPanel/>
                    <PatternListener/>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(SecondRow)
