import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableLeftColumnState, LeftColumn, LeftColumnStateKey } from '../../leftColumn'
import { ImmutableRootState, RootStateKey } from '../state'
import MiddlePlusRightColumns from './MiddlePlusRightColumns'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const leftColumnState: ImmutableLeftColumnState = state.get(RootStateKey.LEFT_COLUMN)

        return {
            patterns: leftColumnState.get(LeftColumnStateKey.PATTERNS),
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
