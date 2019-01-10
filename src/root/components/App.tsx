import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternList, PatternStateKeys } from '../../pattern'
import { PatternSpec } from '../../patternSpec'
import { EnterImmersiveAudioButton, TimeControls } from '../../performer'
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
            <div id='container'>
                <div id='left'>
                    <div id='title'>
                        <div id='title-contents'>
                            <h1>Musical Patterns</h1>
                            <div>Douglas Blumeyer</div>
                        </div>
                    </div>
                    <PatternList {...{ patternId, patterns }}/>
                </div>

                <div id='center'>
                    {patternId ?
                        <div>
                            <div id='performer'>
                                <TimeControls/>
                                <EnterImmersiveAudioButton/>
                            </div>
                            <Post {...{ patternId, patterns }} />
                            <PatternListener {...{ patternId, patterns }}/>
                        </div> :
                        <div id='no-pattern-message'>To begin, select a pattern from the list on the left.</div>
                    }
                </div>

                <div id='right'>
                    <div id='title-spacer'>
                    </div>

                    {patternId && <div>
                        <PatternSpec/>
                    </div>}
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
