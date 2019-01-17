import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternPanel, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import BottomRow from './BottomRow'
import FirstRow from './FirstRow'
import Post from './Post'
import SecondRow from './SecondRow'
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
                <PatternPanel {...{ patternId, patterns }}/>
                <div {...{ id: 'container' }}>
                    <FirstRow {...{ patternId }} />
                    <SecondRow {...{ patternId, patterns }}/>
                    {patternId && <Post {...{ patternId, patterns }}/>}
                    <BottomRow {...{ patternId }} />
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
