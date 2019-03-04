import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, PageStateKey } from '../../page'
import { ImmutableRootState, RootStateKey } from '../state'
import LeftColumn from './LeftColumn'
import MiddlePlusRightColumns from './MiddlePlusRightColumns'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const patternState: ImmutablePageState = state.get(RootStateKey.PAGE)

        return {
            patterns: patternState.get(PageStateKey.PATTERNS),
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
