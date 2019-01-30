import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKeys } from '../../pattern'
import { ImmutableRootState, RootStateKeys } from '../state'
import MainPanel from './MainPanel'
import SidePanel from './SidePanel'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
        }
    }

const App: React.ComponentType<AppProps> =
    ({ patterns, id }: AppProps): JSX.Element => {
        if (!patterns) {
            return <div/>
        }

        return (
            <div {...{ id: 'app' }}>
                <SidePanel {...{ id, patterns }}/>
                <MainPanel {...{ id, patterns }}/>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
