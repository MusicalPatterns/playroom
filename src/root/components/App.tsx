import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternsPanel, PatternStateKeys } from '../../pattern'
import { PatternSpec } from '../../patternSpec'
import { Performer } from '../../performer'
import { ImmutableRootState, RootStateKeys } from '../state'
import PatternListener from './PatternListener'
import Post from './Post'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            patternId: patternState.get(PatternStateKeys.PATTERN_ID),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
        }
    }

const App: React.ComponentType<AppProps> =
    ({ patterns, patternId }: AppProps): JSX.Element => {
        if (!patterns) {
            return <div/>
        }

        return (
            <div {...{ id: 'app' }}>
                <PatternsPanel {...{ patternId, patterns }}/>
                <div {...{ id: 'container' }}>
                    <div {...{ className: 'row', id: 'first-row' }}>
                        <div {...{ className: 'left' }} >
                            <Performer {...{ disabled: !patternId }}/>
                        </div>
                        <div {...{ className: 'right' }} />
                    </div>

                    {patternId && <div {...{ className: 'row', id: 'second-row' }} >
                        <div {...{ className: 'left' }} >
                            <h1>{patterns[ patternId ].metadata.formattedName}</h1>
                        </div>
                        <div {...{ className: 'right' }} >
                            <PatternSpec/>
                            <PatternListener {...{ patternId, patterns }}/>
                        </div>
                    </div>}
                    {patternId && < Post {...{ patternId, patterns }}/>}

                    <div {...{ className: 'row', id: 'bottom-row' }} >
                        <div {...{ className: 'left' }} />
                        <div {...{ className: 'right' }} />
                    </div>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
