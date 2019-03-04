import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternStateKey } from '../../pattern'
import { ImmutableRootState, RootStateKey } from '../state'
import LeftColumn from './LeftColumn'
import MiddlePlusRightColumns from './MiddlePlusRightColumns'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKey.PATTERN)

        return {
            patterns: patternState.get(PatternStateKey.PATTERNS),
        }
    }

const App: React.ComponentType<AppProps> =
    ({ patterns }: AppProps): JSX.Element => {
        if (!patterns) {
            return <div/>
        }

        return (
            <div {...{ id: 'app' }}>
                <LeftColumn/>
                <MiddlePlusRightColumns/>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
