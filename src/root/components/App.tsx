import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternList, PatternStateKeys } from '../../pattern'
import { PatternSpec } from '../../patternSpec'
import { Performer } from '../../performer'
import { ImmutableRootState, RootStateKeys } from '../state'
import PatternListener from './PatternListener'
import Post from './Post'
import Title from './Title'
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
            <div {...{ id: 'container' }}>
                <div {...{ id: 'left' }}>
                    <Title/>
                    <PatternList {...{ patternId, patterns }}/>
                </div>

                <div {...{ id: 'center' }}>
                    <Performer {...{ disabled: !patternId }}/>
                    {patternId && <Post {...{ patternId, patterns }} />}
                </div>

                <div {...{ id: 'right' }}>
                    <div {...{ id: 'title-spacer' }} />
                    {patternId && <PatternSpec/>}
                    {patternId && <PatternListener {...{ patternId, patterns }}/>}
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
